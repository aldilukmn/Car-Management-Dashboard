import { Errback, Response } from "express";
import CarRequest from "../models/dto/car";
import DefaultResponse from "../models/dto/response";
import Car from "../models/entity/car";
import CarRepository from "../repositories/cars";
import cloudinary from "../../config/cloudinary";

export default class CarsService {
  static async listCar(res: Response, size: string) {
    try {
      let getCar: Car[] = await CarRepository.getAllCars();

    getCar.sort((a, b) => {
      const dateA = new Date(a.update).getTime();
      const dateB = new Date(b.update).getTime();
      return dateB - dateA;
    });

    const convertUpdate = getCar?.map((car) => {
      const getDate = new Date(car.update);
      const monthName = getDate.toLocaleString("id-ID", { month: "long" });
      const getTime = `${getDate.getDate()} ${monthName} ${getDate.getFullYear()}, ${getDate.toLocaleTimeString(
        "id-ID",
        { hour: "2-digit", minute: "2-digit" }
      )}`;
      return {
        id: car.id,
        image: car.image,
        name: car.name,
        rent: car.rent,
        update: getTime,
        size: car.size,
      };
    });

    if (size) {
      getCar = convertUpdate.filter((car) => car.size === size);
    } else {
      getCar = convertUpdate;
    }

    return getCar
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: error.status.code ? error.status.code : 500,
          response: error.status.response ? error.status.response : "error",
          message: error.status.message ? error.status.message : "Internal server error",
        }
      }
      return res.status(error.status.code ? error.status.code : 500).json(response);
    }
  }

  static async createCar(res: Response, payload: CarRequest, image: any, typeImage: any) {
    try {
    if (!payload.name || !payload.rent || !payload.size || !image) {
      throw new Error(`${
        !payload.name
            ? "name"
            : !payload.rent
            ? "rent"
            : !payload.size
            ? "size"
            : !image
            ? "image"
            : null
        } is required!`);
    }
    if (
    typeImage != "image/png" &&
    typeImage != "image/jpg" &&
    typeImage != "image/jpeg"
    ) {
    throw new Error("It's not image format!");
    }
    const imageUrl = await cloudinary.uploader.upload(
    image,
    { folder: "dump" },
    function (err: any, result: any) {
      if (err) {
        throw new Error("Failed to upload image to cloudinary");
      }
      return result;
    }
    );

    const newCar: CarRequest = {
      name: payload.name.toLowerCase(),
      rent: payload.rent,
      size: payload.size.toLocaleLowerCase(),
      image_url: imageUrl.secure_url,
      update: new Date().toISOString(),
    }

    await CarRepository.createCar(newCar);

    return newCar;
    } catch (error) {
    const response: DefaultResponse = {
      status: {
        code: 400,
        response: "fail",
        message: `${error}`,
      }
    }
    return res.status(400).json(response);
    }
  }

  static async getCarById(res: Response, carId: number) {
    const getCar = await CarRepository.getCarById(carId);

    try {
      if (!getCar) {
        const response: DefaultResponse = {
          status: {
            code: 404,
            response: "fail",
            message: "Car not found",
          },
        };  
        throw response;
      }

      return getCar;
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: error.status.code ? error.status.code : 500,
          response: error.status.response ? error.status.response : "error",
          message: error.status.message ? error.status.message : "Internal server error",
        }
      }
      return res.status(error.status.code ? error.status.code : 500).json(response);
    }
    
  }

  static async deleteCar(res: Response, carId: number) {
    try {
      const deleteCar = await CarRepository.deleteCar(carId);

      if (deleteCar === 0) {
        const response: DefaultResponse = {
          status: {
            code: 404,
            response: "fail",
            message: "Car not found",
          },
        };  
        throw response;
      }

      const response: DefaultResponse = {
        status: {
          code: 200,
          response: "success",
          message: "Car has been deleted",
        },
      };  

      return response;
      } catch (error: any) {
        const response: DefaultResponse = {
          status: {
            code: error.status.code ? error.status.code : 500,
            response: error.status.response ? error.status.response : "error",
            message: error.status.message ? error.status.message : "Internal server error",
          }
        }
        return res.status(error.status.code ? error.status.code : 500).json(response);
      }
  }

  static async updateCar(res: Response, payload: CarRequest, carId: number, image: any, typeImage?: any) {

  let carUpdate: CarRequest;

  try {
    const getCar = await CarRepository.getCarById(carId);

    if(!getCar) {
      const response: DefaultResponse = {
        status: {
          code: 404,
          response: "fail",
          message: "Car not found!",
        },
      };  
      throw response;
    }

    if (image) {
      if (
        typeImage != "image/png" &&
        typeImage != "image/jpg" &&
        typeImage != "image/jpeg"
        ) {
        const response: DefaultResponse = {
          status: {
            code: 400,
            response: "fail",
            message: "It's not image format!",
          },
        };  
        throw response;
        }
      const result = await cloudinary.uploader.upload(
        image,
        { folder: "dump" },
        async function (error: any, result: any) {
          if (error) {
            const response: DefaultResponse = {
              status: {
                code: 500,
                response: "fail",
                message: "Failed to upload image to cloudinary",
              },
            };  
            throw response;
          }
          return result;
        }
      );
      const imageUrl = result.secure_url;
      carUpdate = await CarsService.saveUpdate(payload, imageUrl, carId);
    } else {
      carUpdate = await CarsService.saveUpdate(payload, undefined, carId);
    }

    return carUpdate;
  } catch (error: any) {
    const response: DefaultResponse = {
      status: {
        code: error.status.code ? error.status.code : 500,
        response: error.status.response ? error.status.response : "error",
        message: error.status.message ? error.status.message : "Internal server error",
      }
    }
    return res.status(error.status.code ? error.status.code : 500).json(response);
  }
  }

  static async saveUpdate(
    payload: CarRequest,
    imageUrl?: string,
    carId?: number
  ) {
    const updateCar: CarRequest = {
      name: payload.name,
      rent: payload.rent,
      size: payload.size?.toLowerCase(),
      image_url: imageUrl,
      update: new Date().toISOString()
    }
  
    await CarRepository.updateCar(carId, updateCar);
    return updateCar;
  }
}