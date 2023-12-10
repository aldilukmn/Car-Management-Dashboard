import db from "../../config/knex";
import dotenv from "dotenv";
import { CarRequest } from "../models/dto/car";
dotenv.config()

export default class CarRepository {
  static async getAllCars(getOffSet: number, perPage: number) {
    const cars = await db.select("*").where({is_deleted: false}).limit(perPage).offset(getOffSet).from(`${process.env.CARS_TABLE}`);

    const totalData = await db(`${process.env.CARS_TABLE}`).count().where({is_deleted: false}).first();

    return {
      cars: cars,
      total: Number(totalData?.count)
    }
  }

  static async getCarByAddedBy(getOffSet: number, perPage: number, user?: string) {
    const cars = await db.select("*").where({  added_by: user, is_deleted: false}).limit(perPage).offset(getOffSet).from(`${process.env.CARS_TABLE}`);

    const totalData = await db(`${process.env.CARS_TABLE}`).count().where({  added_by: user, is_deleted: false}).first(); 

    return {
      cars: cars,
      total: Number(totalData?.count),
    }
  }

  static async getCarById(carId: number) {
    return await db(`${process.env.CARS_TABLE}`).where({ id: carId }).first();
  }

  static async createCar(data: CarRequest) {
    return await db(`${process.env.CARS_TABLE}`).insert(data);
  }

  static async updateCar(cardId?: number, data?: CarRequest) {
    return await db(`${process.env.CARS_TABLE}`).where({ id: cardId }).update(data);
  }

  static async deleteCar(carId: number) {
    return await db(`${process.env.CARS_TABLE}`).where({ id: carId }).del();
  }

  static async getCarByUsername(user: string) {
    return await db(`${process.env.CARS_TABLE}`).where({ added_by: user, is_deleted: false });
  }
}