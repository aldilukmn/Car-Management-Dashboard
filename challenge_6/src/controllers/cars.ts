import type { Request, Response } from 'express'
import type { CarRequest } from '../models/dto/car'
import type DefaultResponse from '../models/dto/response'
import CarsService from '../services/cars'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Cars {
  static listCar = async (req: Request, res: Response): Promise<void> => {
    const size = req.query.size as string
    try {
      const getCar = await CarsService.listCar(size)
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: 'Data successfully retrieved'
        },
        result: getCar
      }
      res.status(200).json(response)
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'error',
          message: `${error}`
        }
      }
      res.status(400).json(response)
    }
  }

  static createCar = async (req: Request, res: Response): Promise<void> => {
    const payload: CarRequest = req.body
    const image: string | undefined = req.file?.path
    const typeImage: any = req.file?.mimetype
    const getUser: string = req.user
    const getRole: string = req.role
    try {
      const newCar = await CarsService.createCar(payload, image, typeImage, getUser, getRole)
      const response: DefaultResponse = {
        status: {
          code: 201,
          response: 'success',
          message: 'Car successfully created'
        },
        result: newCar
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

  static getCarById = async (req: Request, res: Response): Promise<void> => {
    const carId: number = Number(req.params.id)
    try {
      const getCar = await CarsService.getCarById(carId)
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: 'Car has found'
        },
        result: getCar
      }
      res.status(200).json(response)
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 404,
          response: 'fail',
          message: `${error}`
        }
      }
      res.status(404).json(response)
    }
  }

  static deleteCar = async (req: Request, res: Response): Promise<void> => {
    const carId: number = Number(req.params.id)
    const getUser = req.user as string
    const getRole = req.role as string
    try {
      const response = await CarsService.deleteCar(carId, getUser, getRole)
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

  static updateCar = async (req: Request, res: Response): Promise<void> => {
    const payload: CarRequest = req.body
    const carId: number = Number(req.params.id)
    const image: string | undefined = req.file?.path
    const typeImage: any = req.file?.mimetype
    const getUser = req.user as string
    const getRole = req.role as string
    try {
      const carUpdate = await CarsService.updateCar(res, payload, carId, image, typeImage, getUser, getRole)
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: 'Car successfully updated'
        },
        result: carUpdate
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
