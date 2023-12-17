import db from '../../config/knex'
import dotenv from 'dotenv'
import type UserRequest from '../models/dto/user'
import type User from '../models/entity/user'
dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UserRepository {
  static async getUserByEmail (userEmail: string): Promise<User> {
    return await db(`${process.env.USERS_TABLE}`).where({ email: userEmail }).first()
  }

  static async getUserByUsername (userName: string): Promise<User> {
    return await db(`${process.env.USERS_TABLE}`).where({ username: userName }).first()
  }

  static async createUser (data: UserRequest): Promise<User> {
    return await db(`${process.env.USERS_TABLE}`).insert(data)
  }

  static async getUsers (): Promise<User[]> {
    return await db.select('email', 'username', 'role').from(`${process.env.USERS_TABLE}`)
  }

  static async getUsersByRole (userRole: string): Promise<User[]> {
    return await db.select('email', 'username', 'role').from(`${process.env.USERS_TABLE}`).whereNot({ role: userRole })
  }
}
