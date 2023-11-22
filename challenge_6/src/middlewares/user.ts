import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import DefaultResponse from "../models/dto/response";
dotenv.config();

export default class UserMiddleware {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    // const token = req.headers["authorization"];
    const token = req.cookies.Token;
    
    if(!token) {
      const response: DefaultResponse = {
        status: {
          code: 401,
          response: "fail",
          message: "Please login first!"
          // message: "Token not provided!"
        }
      }
      return res.status(401).json(response);
    };

    if (!process.env.SECRET_KEY) {
      const response: DefaultResponse = {
        status: {
          code: 500,
          response: "error",
          message: "SECRET_KEY is not defined in the environment variables!"
        }
      }
      return res.status(500).json(response);
    }

    if(!token.startsWith("Bearer")) {
      const response: DefaultResponse = {
        status: {
          code: 401,
          response: "fail",
          message: "Wrong format token!"
          // message: "Token not provided!"
        }
      }
      return res.status(403).json(response);
    }
    const getToken = token.split(" ")[1];
    jwt.verify(getToken, process.env.SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        const response: DefaultResponse = {
          status: {
            code: 401,
            response: "error",
            message: "Invalid token!"
          }
        }
      return res.status(401).json(response);
    }
    next();
    });
  }

  static async isAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.Token;
    if(!token) {
      const response: DefaultResponse = {
        status: {
          code: 403,
          response: "fail",
          message: "Token not provided!"
        }
      }
      return res.status(403).json(response);
    }

    if (!process.env.SECRET_KEY) {
      const response: DefaultResponse = {
        status: {
          code: 500,
          response: "error",
          message: "SECRET_KEY is not defined in the environment variables!"
        }
      }
      return res.status(500).json(response);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        const response: DefaultResponse = {
          status: {
            code: 401,
            response: "error",
            message: "Invalid token!"
          }
        }
      return res.status(401).json(response);
    }
    const role: string = decoded.role;
    if(role === "admin") {
      next();
    } else {
      const response: DefaultResponse = {
        status: {
          code: 403,
          response: "fail",
          message: "Access denied for non-admin users!",
        },
      };
      return res.status(response.status.code).json(response);
    }
    });
  }
}