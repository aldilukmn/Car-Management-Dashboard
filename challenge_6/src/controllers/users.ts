import { Request, Response } from "express";
import UserRequest from "../models/dto/user";
import DefaultResponse from "../models/dto/response";
import dotenv from "dotenv";
import UsersService from "../services/users";
import CarsService from "../services/cars";
dotenv.config();

export default class Users {
  static async register(req: Request, res: Response) {
    const payload: UserRequest = req.body;
    const image: any = req.file?.path;
    const typeImage: any = req.file?.mimetype;
    try {
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
      const response = await UsersService.login(res, payload);
      res.status(200).json(response);
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

  static async logout(req: Request, res: Response) {
    try {
      await UsersService.logout(res);
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

  static async currentUser(req: Request, res: Response) {
    try {
      const data = await UsersService.currentUser(req.user);
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: "success",
          message: "Data successfully retrieved",
        },
        result: {
          user: data.user,
          cars: data.cars
        }
      }
      res.status(200).json(response);
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

  static async getAll(req: Request, res: Response) {
    const size = req.query.size as string;
    const getRole = req.role as string;
    const getUser = req.user;
    const searchCar = req.query.search as string;
    const currentPage = req.query.page as string;
    const perPage = req.query.perPage as string;
    try {
      const getUsers = await UsersService.listUser(getRole);
      const getCar = await CarsService.listCar(size, getUser, searchCar, currentPage, perPage);
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: "success",
          message: "Data successfully retrieved"
        },
        result: {
          users: getUsers,
          cars: getCar.getCar,
          total_data_car: getCar.totalDataCar,
          current_page: getCar.currentPageNumber,
          per_page: getCar.perPageNumber,
        }
      };
      res.status(200).json(response);
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

  static async loginGoogle(req: Request, res: Response) {
    const payload = req.query.access_token as string;
    try {
      const response = await UsersService.loginGoogle(payload);
      res.status(200).json(response);
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
}
