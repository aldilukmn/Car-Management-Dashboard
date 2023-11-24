import db from "../../config/knex";
import dotenv from "dotenv";
import { CarRequest } from "../models/dto/car";
dotenv.config()

export default class CarRepository {
  static async getAllCars() {
    return await db.select("*").where({is_deleted: false}).from(`${process.env.CARS_TABLE}`);
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