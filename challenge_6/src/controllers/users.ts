import { Request, Response } from "express";
import UserRequest from "../models/dto/user";
import DefaultResponse from "../models/dto/response";
import dotenv from "dotenv";
import UsersService from "../services/users";
import db from "../../config/knex";
import CarsService from "../services/cars";
import UserRepository from "../repositories/users";
dotenv.config();

export default class Users {
  static async register(req: Request, res: Response) {
    const payload: UserRequest = req.body;
    const image: any = req.file?.path;
    const typeImage: any = req.file?.mimetype;
    try {
      await db.raw("SELECT 1");
      const newUser = await UsersService.register(res, payload, image, typeImage);
      const response: DefaultResponse = {
        status: {
          code: 201,
          response: "success",
          message: "User successfully created",
        },
        result: newUser
      };
      res.status(201).json(response);
    } catch (error) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: "fail",
          message: `${error}`,
        },
      };  
      res.status(400).json(response);
    }
  }

  static async login(req: Request, res: Response) {
    const payload: UserRequest = req.body;
    try {
      await db.raw("SELECT 1");
      await UsersService.login(res, payload);
    } catch (error) {
      console.log("error => ", error)
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

  static async logout(req: Request, res: Response) {
    try {
      await db.raw("SELECT 1");
      await UsersService.logout(req, res);
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

  static async getAll(req: Request, res: Response) {
    const size = req.query.size as string;
    try {
      await db.raw("SELECT 1");
      const getCar = await CarsService.listCar(res, size);
      const getUser = await UsersService.listUser(res);
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: "success",
          message: "Data successfully retrieved"
        },
        result: {
          listUser: getUser,
          listCar: getCar,
        }
      };
  
      res.status(response.status.code).json(response);
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

  static async listUser(req: Request, res: Response) {
    const getUser = await UsersService.listUser(res);
    const response: DefaultResponse = {
      status: {
        code: 200,
        response: "success",
        message: "Data successfully retrieved"
      },
      result: getUser
    };

    res.status(response.status.code).json(response);
  }

  static async getCarsByUser(req: Request, res: Response) {
    const userPayload: string = req.params.user;
    try {
      const getUser = await UserRepository.getUserByUsername(userPayload);
      if(getUser) {

        console.log(getUser);
      } else {
        console.log('gada');
      }
    } catch (error) {
      
    }
  }
}