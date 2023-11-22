import { Request, Response } from "express";
import CarRequest from "../models/dto/car";
import DefaultResponse from "../models/dto/response";
import CarsService from "../services/cars";
import db from "../../config/knex";

export default class Cars {
  static async listCar(req: Request, res: Response) {
    const size = req.query.size as string;
    try {
      const getCar = await CarsService.listCar(res, size);
      await db.raw("SELECT 1");
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: "success",
          message: "Data successfully retrieved"
        },
        result: getCar
      };
  
      res.status(200).json(response);
    } catch (error) {
      const response: DefaultResponse = {
        status: {
          code: 500,
          response: "error",
          message: `${error}`,
        },
      };
      res.status(500).json(response);
    }
  }

  static async createCar(req: Request, res: Response) {
    const payload: CarRequest = req.body;
    const image: any = req.file?.path;
    const typeImage: any = req.file?.mimetype;
    try {
      await db.raw("SELECT 1");
      const newCar = await CarsService.createCar(res, payload,image, typeImage);
      const response: DefaultResponse = {
        status: {
          code: 201,
          response: "success",
          message: "Car successfully created",
        },
        result: newCar
      };  
      return res.status(201).json(response);
    } catch (error) {
      const response: DefaultResponse = {
        status: {
          code: 500,
          response: "error",
          message: `${error}`,
        },
      };  
      res.status(500).json(response);
    }
  }

  static async getCarById(req: Request, res: Response) {
    const carId: number = Number(req.params.id);
    try {
      await db.raw("SELECT 1");
      const getCar = await CarsService.getCarById(res, carId);
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: "success",
          message: "Car has found",
        },
        result: getCar
      }; 

      return res.status(200).json(response);
    } catch (error) {
      const response: DefaultResponse = {
        status: {
          code: 500,
          response: "error",
          message: `${error}`,
        },
      };  
      res.status(500).json(response);
    }
  }

  static async deleteCar(req: Request, res: Response) {
    const carId: number = Number(req.params.id);
    try {
      await db.raw("SELECT 1");
      const response = await CarsService.deleteCar(res, carId);
      return res.status(200).json(response);
    } catch (error) {
      const response: DefaultResponse = {
        status: {
          code: 500,
          response: "error",
          message: `${error}`,
        },
      };  
      res.status(500).json(response);
    }
  }

  static async updateCar(req: Request, res: Response) {
    const payload: CarRequest = req.body;
    const carId: number = Number(req.params.id);
    const image: any = req.file?.path;
    const typeImage: any = req.file?.mimetype;
    try {
      await db.raw("SELECT 1");
      const carUpdate = await CarsService.updateCar(res, payload, carId, image, typeImage);
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: "success",
          message: "Car successfully updated",
        },
        result: carUpdate
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: DefaultResponse = {
        status: {
          code: 500,
          response: "error",
          message: `${error}`,
        },
      };  
      res.status(500).json(response);
    }
   } 
}