import db from '../../config/knex'
import dotenv from 'dotenv'
import type UserRequest from '../models/dto/user'
import type User from '../models/entity/user'
dotenv.config()

interface addUser {
  email?: string
  username?: string
  password?: string
  role?: string
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UserRepository {
  private static readonly users: addUser[] = []

  static async addUserTest (user: addUser): Promise<void> {
    user.role = 'admin'
    this.users.push(user)
  }

  static async getUserTest (username: string): Promise<addUser | undefined> {
    const user = this.users.find((u) => u.username === username)
    return user
  }

  static async getEmailTest (e: string): Promise<addUser | undefined> {
    const email = this.users.find((u) => u.email === e)
    return email
  }

  static async clearUser (): Promise<void> {
    delete this.users[0]
  }

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
