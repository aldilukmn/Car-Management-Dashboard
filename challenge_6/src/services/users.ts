import { NextFunction, Request, Response } from "express";
import DefaultResponse from "../models/dto/response";
import UserRequest from "../models/dto/user";
import UserRepository from "../repositories/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/entity/user";
import cloudinary from "../../config/cloudinary";
import CarRepository from "../repositories/cars";
dotenv.config();

export default class UsersService {
  static async register(res: Response,payload: UserRequest, image: any, typeImage: any) {
    try {
      if(!payload.email || !payload.username || !payload.password || !image) {  
        throw new Error(`${
          !payload.email ? "email" : 
          !payload.username ? "username" : 
          !payload.password ? "password" :
          !image ? "image" : null} is required!`);
      }

      if(!payload.email.includes("@")) {
        throw new Error("Not email format!");
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
        role: payload.role ? payload.role : "member",
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
        throw ({
          message: `${
            !payload.username ? "username" : 
            !payload.password ? "password" : null} is required!}`
        })
        }
      
      const getUsername = await UserRepository.getUserByUsername(payload.username);
        
      if(!getUsername) {
        throw ({
          message: "Username does not exist!"
        })
      };

      const isPasswordCorret = await bcrypt.compare(payload.password, getUsername.password);

      if(!isPasswordCorret) {
       throw ({
        message: "Wrong password!"
       })
      };

      if (!process.env.SECRET_KEY) {
        const response: DefaultResponse = {
          status: {
            code: 500,
            response: "error",
            message: "Secret key is not defined in the environment variables!",
          }
        }
        return res.status(500).json(response);
      }

      const token = jwt.sign({ user: payload.username, role: getUsername.role }, process.env.SECRET_KEY, { expiresIn: "1h"});

      const response: DefaultResponse = {
        status: {
          code: 200,
          response: "success",
          message: `${getUsername.username} successfully login`,
        },
        result: {
          token: token,
        }
      };

      res.cookie("Token", `Bearer ${token}`, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      return res.status(200).json(response);
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: "fail",
          message: error.message,
        }
      }
      return res.status(400).json(response);
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

  static async currentUser(currentUser: string) {
    try {
      const isUser = await UserRepository.getUserByUsername(currentUser);
      const getCar = await CarRepository.getCarByUsername(currentUser);
      if(!isUser) {
        throw ({
          message: "User does not exist!"
        })
      }
      return {
        user: isUser,
        cars: getCar
      };
    } catch (error: any) {
      throw error.message
    }
  }

  static async listUser(role?: string) {
    let getUsers: User[];
    try {
      getUsers = await UserRepository.getUsers();
      if(role === "admin") {
        getUsers = await UserRepository.getUsersByRole("superadmin");
      }
      return getUsers;
    } catch (error) {
      throw error
    }
  }
}