import db from "../../config/knex";
import dotenv from "dotenv";
import UserRequest from "../models/dto/user";
dotenv.config()

export default class UserRepository {
  static async getUserByEmail(userEmail: string) {
    return await db(`${process.env.USERS_TABLE}`).where({ email: userEmail }).first();
  }

  static async getUserByUsername(userName: string) {
    return await db(`${process.env.USERS_TABLE}`).where({ username: userName }).first();
  }

  static async createUser(data: UserRequest) {
    return await db(`${process.env.USERS_TABLE}`).insert(data);
  }

  static async getUsers() {
    return await db.select("email", "username", "role").from(`${process.env.USERS_TABLE}`);
  }
  
  static async getUsersByRole(userROle: string) {
    return await db.select("email", "username", "role").from(`${process.env.USERS_TABLE}`).whereNot({ role: userROle });
  }
}