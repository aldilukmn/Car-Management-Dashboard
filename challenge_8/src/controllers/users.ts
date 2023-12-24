import type { Request, Response } from 'express'
import type UserRequest from '../models/dto/user'
import type DefaultResponse from '../models/dto/response'
import dotenv from 'dotenv'
import UsersService from '../services/users'
import CarsService from '../services/cars'
dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Users {
  static register = async (req: Request, res: Response): Promise<any> => {
    const payload: UserRequest = req.body
    // const image: any = req.file?.path
    // const typeImage: any = req.file?.mimetype
    try {
      const newUser = await UsersService.register(payload)
      const response: DefaultResponse = {
        status: {
          code: 201,
          response: 'success',
          message: 'User successfully created'
        },
        result: newUser
      }
      res.status(201).json(response)
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'fail',
          message: `${error}`
        }
      }
      res.status(400).json(response)
    }
  }

  static login = async (req: Request, res: Response): Promise<void> => {
    const payload: UserRequest = req.body
    try {
      const response = await UsersService.login(payload)
      res.status(200).json(response)
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'fail',
          message: `${error}`
        }
      }
      res.status(400).json(response)
    }
  }

  static loginGoogle = async (req: Request, res: Response): Promise<void> => {
    const payload = req.query.access_token as string
    try {
      const response = await UsersService.loginGoogle(payload)
      res.status(200).json(response)
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'fail',
          message: `${error}`
        }
      }
      res.status(400).json(response)
    }
  }

  static logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await UsersService.logout(res)
      res.status(200).json(response)
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'fail',
          message: `${error}`
        }
      }
      res.status(400).json(response)
    }
  }

  static currentUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await UsersService.currentUser(req.user as string)
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: 'Data successfully retrieved'
        },
        result: {
          user: data.user,
          cars: data.cars
        }
      }
      res.status(200).json(response)
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'fail',
          message: `${error}`
        }
      }
      res.status(400).json(response)
    }
  }

  static getAll = async (req: Request, res: Response): Promise<any> => {
    const size = req.query.size as string
    const getRole: string = req.role
    const getUser = req.user as string
    const searchCar = req.query.search as string
    const currentPage = req.query.page as string
    const perPage = req.query.perPage as string
    try {
      const getUsers = await UsersService.listUser(getRole)
      const getCar = await CarsService.listCar(size, getUser, searchCar, currentPage, perPage)
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: 'Data successfully retrieved'
        },
        result: {
          users: getUsers,
          cars: getCar.getCar,
          total_data_car: getCar.totalDataCar,
          current_page: getCar.currentPageNumber,
          per_page: getCar.perPageNumber
        }
      }
      res.status(200).json(response)
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'fail',
          message: `${error}`
        }
      }
      res.status(400).json(response)
    }
  }
}
