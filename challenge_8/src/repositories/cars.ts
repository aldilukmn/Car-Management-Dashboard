import db from '../../config/knex'
import dotenv from 'dotenv'
import type { CarRequest } from '../models/dto/car'
import type Car from '../models/entity/car'
dotenv.config()

interface CurrentCarsResult {
  cars: Car[]
  total?: number
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class CarRepository {
  static async getAllCars (getOffSet: number, perPage: number): Promise<CurrentCarsResult> {
    const cars = await db.select('*').where({ is_deleted: false }).limit(perPage).offset(getOffSet).from(`${process.env.CARS_TABLE}`)

    const totalData = await db(`${process.env.CARS_TABLE}`).count().where({ is_deleted: false }).first()

    return {
      cars: cars as Car[],
      total: Number(totalData?.count)
    }
  }

  static async getCarByAddedBy (getOffSet: number, perPage: number, user?: string): Promise<CurrentCarsResult> {
    const isUser = user ? { added_by: user } : { created_by: 'admin' }
    const cars = await db
      .select('*')
      .where(isUser)
      .andWhere({ is_deleted: false })
      .limit(perPage)
      .offset(getOffSet)
      .from(`${process.env.CARS_TABLE}`)

    const totalData = await db(`${process.env.CARS_TABLE}`).count().where({ added_by: user ?? '', is_deleted: false }).first()

    return {
      cars: cars as Car[],
      total: Number(totalData?.count)
    }
  }

  static async getCarById (carId: number): Promise<Car> {
    return await db(`${process.env.CARS_TABLE}`).where({ id: carId }).first()
  }

  static async createCar (data: CarRequest): Promise<Car> {
    return await db(`${process.env.CARS_TABLE}`).insert(data)
  }

  static async updateCar (cardId?: number, data?: CarRequest): Promise<Car> {
    return await db(`${process.env.CARS_TABLE}`).where({ id: cardId }).update(data)
  }

  static async deleteCar (carId: number): Promise<CurrentCarsResult> {
    return await db(`${process.env.CARS_TABLE}`).where({ id: carId }).del()
  }

  // static async deleteCar (carId: number): Promise<Car[]> {
  //   await db(`${process.env.CARS_TABLE}`).where({ id: carId }).del()
  //   return await db(`${process.env.CARS_TABLE}`).select()
  // }

  // static async getCarByUsername (user: string): Promise<Car[]> {
  //   return await db(`${process.env.CARS_TABLE}`).where({ added_by: user, is_deleted: false })
  // }
  static async getCarByUsername (user: string): Promise<Car[]> {
    return await db(`${process.env.CARS_TABLE}`).where({ added_by: user, is_deleted: false }).select()
  }
}
