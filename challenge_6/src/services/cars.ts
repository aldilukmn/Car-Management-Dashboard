import { Response } from "express";
import { CarRequest, saveUpdate } from "../models/dto/car";
import DefaultResponse from "../models/dto/response";
import Car from "../models/entity/car";
import CarRepository from "../repositories/cars";
import cloudinary from "../../config/cloudinary";

export default class CarsService {
  static async listCar(size: string) {
    try {
      let getCar: Car[] = await CarRepository.getAllCars();

      getCar.sort((a, b) => {
      const dateA = new Date(a.updated_at).getTime();
      const dateB = new Date(b.updated_at).getTime();
      return dateB - dateA;
      });

      const convertUpdate = getCar?.map((car) => {
        const getDate = new Date(car.updated_at);
        const monthName = getDate.toLocaleString("id-ID", { month: "long" });
        const getTime = `${getDate.getDate()} ${monthName} ${getDate.getFullYear()}, ${getDate.toLocaleTimeString(
          "id-ID",
          { hour: "2-digit", minute: "2-digit" }
        )}`;
        return {
          id: car.id,
          name: car.name,
          rent: car.rent,
          size: car.size,
          image_url: car.image_url,
          added_by: car.added_by,
          updated_by: car.updated_by,
          updated_at: getTime,
        };
      });

      if (size) {
        getCar = convertUpdate.filter((car) => car.size === size);
      } else {
        getCar = convertUpdate;
      }

      return getCar
      } catch (error: any) {
        throw error.message;
      }
    }

  static async createCar(payload: CarRequest, image: any, typeImage: any, getUser: string, getRole: string) {
    try {
      if (!payload.name || !payload.rent || !payload.size || !image) {
        throw ({
          message: `${
            !payload.name
                ? "name"
                : !payload.rent
                ? "rent"
                : !payload.size
                ? "size"
                : !image
                ? "image"
                : null
            } is required!`
        });
      }
      if (
      typeImage != "image/png" &&
      typeImage != "image/jpg" &&
      typeImage != "image/jpeg"
      ) {
      throw ({
        message: "It's not image format!"
      });
      }
      const imageUrl = await cloudinary.uploader.upload(
      image,
      { folder: "dump" },
      function (err: any, result: any) {
        if (err) {
          throw ({
            message: "Failed to upload image to cloudinary"
          });
        }
        return result;
      }
      );

      const newCar: CarRequest = {
        name: payload.name.toLowerCase(),
        rent: payload.rent,
        size: payload.size.toLocaleLowerCase(),
        image_url: imageUrl.secure_url,
        added_by: getUser,
        created_by: getRole,
        updated_by: getRole,
      }

      await CarRepository.createCar(newCar);

      return newCar;
    } catch (error: any) {
      throw error.message;
    }
  }

  static async getCarById(carId: number) {
    try {
      const getCar = await CarRepository.getCarById(carId);
      if (!getCar) {
        throw ({
          message: "Car not found"
        })
      }

      const getDate = new Date(getCar.updated_at);
      const monthName = getDate.toLocaleString("id-ID", { month: "long" });
      const getTime = `${getDate.getDate()} ${monthName} ${getDate.getFullYear()}, ${getDate.toLocaleTimeString(
        "id-ID",
        { hour: "2-digit", minute: "2-digit" }
      )}`;

      const transformedCar: Car = {
        id: getCar.id,
        name: getCar.name,
        rent: getCar.rent,
        size: getCar.size,
        image_url: getCar.image_url,
        added_by: getCar.added_by,
        updated_by: getCar.updated_by,
        updated_at: getTime,
      }
      return transformedCar;
    } catch (error: any) {
      throw error.message
    }
  }

  static async deleteCar(carId: number, getUser: string, getRole: string) {
    const deleted_by = getUser as string;
    try {

      const getCar = await CarRepository.getCarById(carId);
    
      if (getCar.added_by === "superadmin" && getRole !== "superadmin") {
        throw ({
          message: "delete denied for non-super admin user!"
        })
      }

      if(getUser !== getCar.added_by && getUser !== "superadmin") {
        throw ({
          message: "update denied for not your data!"
        })
      }

      const updateCar: CarRequest = {
        deleted_by: deleted_by,
        is_deleted: true,
        deleted_at: new Date().toISOString()
      }

      const deleteCar = await CarRepository.updateCar(carId, updateCar);

      if (deleteCar === 0) {
        throw ({
          message: "Car not found!"
        });
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
        throw error.message;
      }
  }

  static async updateCar(res: Response, payload: CarRequest, carId: number, image: any, typeImage?: any, getUser?: string, getRole?: string) {
  let carUpdate: CarRequest;
  try {
    const getCar = await CarRepository.getCarById(carId);
    if(!getCar) {
      throw ({
        message: "Car not found!"
      })
    }

    if(getCar.created_by === "superadmin" && getRole !== "superadmin") {
      throw ({
        message: "update denied for non-super admin user!"
      })
    }

    if(getUser !== getCar.added_by && getUser !== "superadmin") {
      throw ({
        message: "update denied for not your data!"
      })
    }

    if (image) {
      if (
        typeImage != "image/png" &&
        typeImage != "image/jpg" &&
        typeImage != "image/jpeg"
        ) {
        throw ({
          message: "It's not image format!"
        });
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
            return res.status(500).json(response);
          }
          return result;
        }
      );
      const imageUrl = result.secure_url;
      carUpdate = await CarsService.saveUpdate({payload, imageUrl, carId, getRole});
    } else {
      carUpdate = await CarsService.saveUpdate({payload, carId, getRole});
    }

    return carUpdate;
    } catch (error: any) {
      throw error.message;
    }
  }

  static async saveUpdate(options: saveUpdate) {
    const { payload, imageUrl, carId, getRole } = options;
    const updateCar: CarRequest = {
      name: payload.name,
      rent: payload.rent,
      size: payload.size?.toLowerCase(),
      image_url: imageUrl,
      updated_by: getRole as string,
      updated_at: new Date().toISOString()
    }
  
    await CarRepository.updateCar(carId, updateCar);
    return updateCar;
  }
}