import { Request, Response } from "express";
import DefaultResponse from "../models/dto/response";
import UserRequest from "../models/dto/user";
import UserRepository from "../repositories/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/entity/user";
import cloudinary from "../../config/cloudinary";
dotenv.config();

export default class UsersService {
  static async register(res: Response,payload: UserRequest, image: any, typeImage: any) {
    try {
      if(!payload.email || !payload.username || !payload.password) {  
        throw new Error(`${
          !payload.email ? "email" : 
          !payload.username ? "username" : 
          !payload.password ? "password" : null} is required!`);
      }

      
      if(payload.password.length < 8) {
        throw new Error("Password length should be more than 8 characters");
      }

      if (
        typeImage != "image/png" &&
        typeImage != "image/jpg" &&
        typeImage != "image/jpeg"
        ) {
        throw new Error("It's not image format!");
        }

      const getUserEmail = await UserRepository.getUserByEmail(payload.email);

      const getUserName = await UserRepository.getUserByUsername(payload.username);
  
      if(getUserEmail || getUserName) {
        throw ({
          message: `${getUserEmail ? "Email" : "Username"} already exist!`
        });
      }

      const imageUrl = await cloudinary.uploader.upload(
        image,
        { folder: "user" },
        function (err: any, result: any) {
          if (err) {
            const response: DefaultResponse = {
              status: {
                code: 500,
                response: "error",
                message: "Failed to upload image to cloudinary",
              },
            };  
            return res.status(500).json(response);
          }
          return result;
        }
        );
  
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(payload.password, salt);

      const newUser: UserRequest = {
        email: payload.email,
        username: payload.username,
        password: hashPassword,
        image_url: imageUrl.secure_url,
        role: payload.role ? payload.role : "user",
      }

      await UserRepository.createUser(newUser);

      return newUser;
    } catch (error: any) {
      throw error.message;
    }
  }

  static async login(res: Response, payload: UserRequest) {
    try {
      if(!payload.username || !payload.password) {
        const response: DefaultResponse = {
          status: {
            code: 400,
            response: "fail",
            message: `${
              !payload.username ? "username" : 
              !payload.password ? "password" : null} is required!`},
          }
          throw response;
        }
      
      const getUsername = await UserRepository.getUserByUsername(payload.username);
        
      if(!getUsername) {
        const response: DefaultResponse = {
          status: {
            code: 400,
            response: "fail",
            message: "Username does not exist!",
          }
        }
        throw response;
      };

      const isPasswordCorret = await bcrypt.compare(payload.password, getUsername.password);

      if(!isPasswordCorret) {
        const response: DefaultResponse = {
          status: {
            code: 400,
            response: "fail",
            message: "Wrong password!",
          }
        }
        throw response;
      };

      if (!process.env.SECRET_KEY) {
        const response: DefaultResponse = {
          status: {
            code: 500,
            response: "error",
            message: "Secret key is not defined in the environment variables!",
          }
        }
        throw response;
      }

      const token = jwt.sign({ user: payload.username, role: getUsername.role }, process.env.SECRET_KEY, { expiresIn: "1h"});

      const response: DefaultResponse = {
        status: {
          code: 200,
          response: "success",
          message: "User successfully login",
        },
        result: {
          token: token,
        }
      };

      res.cookie("Token", `Bearer ${token}`, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      return res.status(response.status.code).json(response);
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

  static async logout(req: Request, res: Response) {
    const token = req.cookies.Token;
    try {
      if (!token) {
        const response: DefaultResponse = {
          status: {
            code: 401,
            response: "fail",
            message: "Please login first!",
          }
        }
        throw response;
      }
      res.clearCookie("Token");
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: "success",
          message: "User successfully logout",
        }
      }
      res.status(response.status.code).json(response);
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

  static async listUser(res: Response) {
    try {
      let getUser: User[] = await UserRepository.getUsers();
      return getUser;
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
}