import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import type DefaultResponse from '../models/dto/response'
dotenv.config()

declare module 'express' {
  interface Request {
    user?: any
    role?: any
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UserMiddleware {
  static verifyToken = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization
      // console.log(token)
      // const token = req.cookies.Token
      if (!token) {
        throw new Error('Please login first!')
      }
      // if (!process.env.SECRET_KEY) {
      //   const response: DefaultResponse = {
      //     status: {
      //       code: 500,
      //       response: 'error',
      //       message: 'SECRET_KEY is not defined in the environment variables!'
      //     }
      //   }
      //   res.status(500).json(response)
      // }
      if (!token.startsWith('Bearer')) {
        throw new Error('Wrong format token!')
      }
      const getToken: string = token.split(' ')[1]
      jwt.verify(getToken, process.env.SECRET_KEY ?? 'rahasia', (err: any, decoded: any) => {
        if (err) {
          throw new Error('Invalid token!')
        }
        req.user = decoded.user
        next()
      })
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 401,
          response: 'fail',
          message: `${error.message}`
        }
      }
      res.status(401).json(response)
    }
  }

  static isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization
    // const token = req.cookies.Token
    try {
      if (!token) {
        throw new Error('Please login first!')
      }
      // if (!process.env.SECRET_KEY) {
      //   const response: DefaultResponse = {
      //     status: {
      //       code: 500,
      //       response: 'error',
      //       message: 'SECRET_KEY is not defined in the environment variables!'
      //     }
      //   }
      //   res.status(500).json(response)
      // }
      if (!token.startsWith('Bearer')) {
        throw new Error('Wrong format token!')
      }
      const getToken: string = token.split(' ')[1]
      jwt.verify(getToken, process.env.SECRET_KEY ?? 'rahasia', (err: any, decoded: any) => {
        if (err) {
          throw new Error('Invalid token!')
        }
        const role: string = decoded.role
        if (role === 'admin' || role === 'superadmin') {
          req.user = decoded.user
          req.role = role
          next()
        } else {
          const response: DefaultResponse = {
            status: {
              code: 403,
              response: 'fail',
              message: 'Access denied for non-admin users!'
            }
          }
          res.status(403).json(response)
        }
      })
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 401,
          response: 'fail',
          message: `${error.message}`
        }
      }
      res.status(401).json(response)
    }
  }

  static isSuperAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization
      // const token = req.cookies.Token
      if (!token) {
        throw new Error('Please login first!')
      }
      // if (!process.env.SECRET_KEY) {
      //   const response: DefaultResponse = {
      //     status: {
      //       code: 500,
      //       response: 'error',
      //       message: 'SECRET_KEY is not defined in the environment variables!'
      //     }
      //   }
      //   res.status(500).json(response)
      // }
      if (!token.startsWith('Bearer')) {
        throw new Error('Wrong format token!')
      }
      const getToken: string = token.split(' ')[1]
      jwt.verify(getToken, process.env.SECRET_KEY ?? 'rahasia', (err: any, decoded: any) => {
        if (err) {
          throw new Error('Invalid token!')
        }
        const role: string = decoded.role
        if (role === 'superadmin') {
          req.role = role
          next()
        } else {
          const response: DefaultResponse = {
            status: {
              code: 403,
              response: 'fail',
              message: 'Access denied for non-super admin user!'
            }
          }
          return res.status(response.status.code).json(response)
        }
      })
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 401,
          response: 'fail',
          message: `${error.message}`
        }
      }
      res.status(401).json(response)
    }
  }
}
