import { Request, Response } from "express";
// import listCar from "../../data/cars.json";
// import listCars from "../../data/cars-min.json";
import Car from "../models/entity/car";
import CarRequest from "../models/dto/car";
import DefaultResponse from "../models/dto/response";
import cloudinary from "../utils/cloudinary";
import db from "../../config/knex";
import env from "dotenv";
env.config();

export default class Cars {
  static async listCar(req: Request, res: Response) {
    const size = req.query.size;
    let data: Car[];
    try {
      const cars = await db.select("*").from(`${process.env.TABLE}`);
      cars.sort((a, b) => {
        const dateA = new Date(a.update).getTime();
        const dateB = new Date(b.update).getTime();
        return dateB - dateA;
      });

      const getTimeData = cars.map((car) => {
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
        data = getTimeData.filter((car) => car.size === size);
      } else {
        data = getTimeData;
      }
      const response: DefaultResponse = {
        status: "OK",
        message: "Data successfully retrieved",
        data: data,
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching cars:", error);
      const response: DefaultResponse = {
        status: "Error",
        message: "Failed to fetch cars",
      };
      res.status(500).json(response);
    }
  }

  static async createCar(req: Request, res: Response) {
    const payload: CarRequest = req.body;
    const image: any = req.file?.path;
    const typeImage: any = req.file?.mimetype;

    try {
      if (!payload.name || !payload.rent || !payload.size || !image) {
        const response: DefaultResponse = {
          status: "Bad Request",
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
          } is required!`,
        };
        return res.status(404).json(response);
      }

      if (
        typeImage != "image/png" &&
        typeImage != "image/jpg" &&
        typeImage != "image/jpeg"
      ) {
        const response: DefaultResponse = {
          status: "Bad Request",
          message: `It's not image format!`,
        };
        return res.status(400).json(response);
      }
      cloudinary.uploader.upload(
        image.path,
        { folder: "dump" },
        async function (err: any, result: any) {
          if (err) {
            console.log("Error => ", err);
            return res.status(500).json({
              status: "Error",
              message: "Failed to upload image to Cloudinary",
            });
          }
          await db(`${process.env.TABLE}`).insert({
            name: payload.name,
            rent: parseInt(payload.rent),
            update: new Date().toISOString(),
            size: payload.size.toLocaleLowerCase(),
            image: result.secure_url,
          });

          const response: DefaultResponse = {
            status: "OK",
            message: "Car successfully created",
          };
          res.status(201).json(response);
        }
      );
    } catch (error) {
      console.error("Error create a car:", error);
      const response: DefaultResponse = {
        status: "Error",
        message: "Failed to create a car",
      };
      res.status(500).json(response);
    }
  }

  static async getCar(req: Request, res: Response) {
    const carId: number = Number(req.params.id);
    try {
      const car = await db(`${process.env.TABLE}`).where({ id: carId }).first();

      if (!car) {
        const response: DefaultResponse = {
          status: "Not Found",
          message: "Car not found",
        };
        return res.status(404).json(response);
      }

      const response: DefaultResponse = {
        status: "OK",
        message: "Car has found",
        data: car,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error get a car:", error);
      const response: DefaultResponse = {
        status: "Error",
        message: "Failed to get a car",
      };
      res.status(500).json(response);
    }
  }

  static async deleteCar(req: Request, res: Response) {
    const carId: number = Number(req.params.id);
    try {
      const deleteCar = await db(`${process.env.TABLE}`)
        .where({ id: carId })
        .del();

      if (deleteCar === 0) {
        const response: DefaultResponse = {
          status: "Bad Request",
          message: "Car not found!",
        };
        return res.status(404).json(response);
      }

      const response: DefaultResponse = {
        status: "OK",
        message: "Car has been deleted",
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error delete a car:", error);
      const response: DefaultResponse = {
        status: "Error",
        message: "Failed to delete a cars",
      };
      res.status(500).json(response);
    }
  }

  static async updateCar(req: Request, res: Response) {
    const carId: number = Number(req.params.id);
    const payload: Partial<CarRequest> = req.body;
    const image: any = req.file?.path;
    const getId = await db("cars").where({ id: carId }).first();
    if (!getId) {
      return res.status(404).json({
        status: "Bad Request",
        message: "Car not found!",
      });
    }
    try {
      if (image) {
        cloudinary.uploader.upload(
          image,
          { folder: "dump" },
          async function (error: any, result: any) {
            if (error) {
              console.log("Error => ", error);
              const response: DefaultResponse = {
                status: "Error",
                message: "Failed to upload image to cloudinary",
              };
              return res.status(500).json({ response });
            }

            const imageUrl = result.secure_url;
            Cars.saveUpdate(payload, res, imageUrl, carId);
          }
        );
      } else {
        Cars.saveUpdate(payload, res, undefined, carId);
      }
    } catch (error) {
      console.error("Error update a car:", error);
      const response: DefaultResponse = {
        status: "Error",
        message: "Failed to update a car",
      };
      res.status(500).json(response);
    }
  }

  static async saveUpdate(
    req: Partial<CarRequest>,
    res: Response,
    imageUrl?: string,
    carId?: number
  ) {
    await db(`${process.env.TABLE}`)
      .where({ id: carId })
      .update({
        ...req,
        size: req.size?.toLocaleLowerCase(),
        image: imageUrl,
        update: new Date().toISOString(),
      });

    res.status(200).json({
      status: "OK",
      message: "Car successfully updated",
    });
  }
}

// For reference

// static formAddNewCar(req: Request, res: Response) {
//   res.status(200).render('add-new-car/add-new-car',
//     {
//       layout: 'pages/index'
//     })
// }

// static getCars(req: Request, res: Response) {
//   // const updateDataForImage: Car[] = listCar.map((car, id) => {
//   //   return {
//   //     id: id + 1,
//   //     image: car.image.replace(/^\.\//, '/'),
//   //     name: car.model,
//   //     rent: car.rentPerDay,
//   //     update: car.availableAt,
//   //   }
//   // })
//   // fs.writeFileSync('./data/cars-min.json', JSON.stringify(updateDataForImage));

//   listCars.sort((a, b) => {
//     const dateA = new Date(a.update).getTime();
//     const dateB = new Date(b.update).getTime();

//     return dateB - dateA;
//   });

//   const data: Car[] = listCars.map((car) => {
//     const getDate = new Date(car.update);
//     const monthName = getDate.toLocaleString("id-ID", { month: "long" });
//     const getTime = `${getDate.getDate()} ${monthName} ${getDate.getFullYear()}, ${getDate.toLocaleTimeString(
//       "id-ID",
//       { hour: "2-digit", minute: "2-digit" }
//     )}`;
//     return {
//       id: car.id,
//       image: car.image,
//       name: car.name,
//       rent: car.rent,
//       update: getTime,
//       size: car.size,
//     };
//   });

//   const response: DefaultResponse = {
//     status: "OK",
//     message: "Success retrieving data",
//     data: data,
//   };

//   res.status(200).json(response);
// }

// static addNewCar(req: Request, res: Response) {
//   const payload: CarRequest = req.body;
//   const image: any = req.file?.path;

//   cloudinary.uploader.upload(
//     image,
//     { folder: "dump" },
//     function (err: any, result: any) {
//       if (err) {
//         console.log("Error => ", err);
//         return res.status(500).json({
//           status: "Error",
//           message: "Failed to upload image to Cloudinary",
//         });
//       }

//       const newCar: Car = {
//         id: listCars.length - 1 + 1,
//         image: result.secure_url,
//         name: payload.name,
//         rent: parseInt(payload.rent),
//         update: new Date().toISOString(),
//         size: payload.size,
//       };

//       const response: DefaultResponse = {
//         status: "OK",
//         message: "Car successfully created",
//         data: {
//           image: newCar.image,
//           name: newCar.name,
//           rent: newCar.rent,
//           update: newCar.update,
//           size: newCar.size,
//         },
//       };

//       // listCars.push(newCar);
//       fs.writeFileSync("./data/cars-min.json", JSON.stringify(listCars));
//       res.status(201).json(response);
//     }
//   );
// }

// static delCar(req: Request, res: Response) {
//   const id = parseInt(req.params.id as string) as number;

//   const findId = listCars.find((car) => car.id === id);

//   if (!findId) {
//     const response: DefaultResponse = {
//       status: "Bad Request",
//       message: "Id not found!",
//     };
//     return res.status(404).json(response);
//   }

//   const data: Car[] = listCars.filter((car) => {
//     return car.id != id;
//   });
//   fs.writeFileSync("./data/cars-min.json", JSON.stringify(data));
//   res.status(200).json(data);
// }

// static getCarById(req: Request, res: Response) {
//   const getUserId: number = parseInt(req.params.id as string);

//   const filterById = listCars.find((car) => car.id === getUserId);
//   if (!filterById) {
//     const response: DefaultResponse = {
//       status: "Bad Request",
//       message: "Id not found!",
//     };
//     return res.status(404).json(response);
//   }

//   const response: DefaultResponse = {
//     status: "OK",
//     message: "Id has found",
//     data: filterById,
//   };

//   res.status(200).json(response);
// }

// static upCar(req: Request, res: Response) {
//   const getUserId: number = parseInt(req.params.id as string);
//   const filterById = listCars.find((car) => car.id === getUserId);
//   if (!filterById) {
//     const response: DefaultResponse = {
//       status: "Bad Request",
//       message: "Id not found!",
//     };
//     return res.status(404).json(response);
//   }

//   const image: any = req.file?.path;
//   if (image) {
//     cloudinary.uploader.upload(
//       image,
//       { folder: "dump" },
//       function (err: any, result: any) {
//         if (err) {
//           console.log("Error => ", err);
//           return res.status(500).json({
//             status: "Error",
//             message: "Failed to upload image to Cloudinary",
//           });
//         }

//         const updateImage = result.secure_url;
//         Cars.saveUpdate(req, res, filterById, updateImage);
//       }
//     );
//   } else {
//     Cars.saveUpdate(req, res, filterById);
//   }
// }

// static saveUpdate(
//   req: Request,
//   res: Response,
//   filterById: Car,
//   updateImage?: string
// ) {
//   filterById.update = new Date().toISOString();

//   const payload: CarRequest = req.body;

//   Object.assign(filterById, {
//     id: filterById.id,
//     name: payload.name || filterById.name,
//     rent: parseInt(payload.rent) || filterById.rent,
//     size: payload.size || filterById.size,
//     image: updateImage || filterById.image,
//     update: new Date().toISOString(),
//   });

//   // const indexOfCar = listCars.indexOf(filterById);

//   // listCars[indexOfCar] = filterById;

//   fs.writeFileSync("./data/cars-min.json", JSON.stringify(listCars));

//   const response: DefaultResponse = {
//     status: "OK",
//     message: "Id has found",
//     data: filterById,
//   };
//   res.status(200).json(response);
// }
