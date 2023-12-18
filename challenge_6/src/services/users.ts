import type { Response } from 'express'
import type DefaultResponse from '../models/dto/response'
import type UserRequest from '../models/dto/user'
import UserRepository from '../repositories/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import type User from '../models/entity/user'
import CarRepository from '../repositories/cars'
import { OAuth2Client } from 'google-auth-library'
import type Car from '../models/entity/car'
dotenv.config()

interface CurrentUserResult {
  user: User
  cars: Car[]
}

interface addUserTest {
  email?: string
  username?: string
  password?: string
  role?: string
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UsersService {
  static register = async (res: Response, payload: UserRequest, image: any, typeImage: any): Promise<User> => {
    try {
      const env: boolean = process.env.NODE_ENV === 'test'

      if (!payload.email || !payload.username || !payload.password) {
        throw new Error(`${!payload.email ? 'email' : !payload.username ? 'username' : !payload.password ? 'password' : null} is required!`)
      }

      if (!payload.email.includes('@')) {
        throw new Error('Not email format!')
      }

      if (payload.password.length < 8) {
        throw new Error('Password length should be more than 8 characters!')
      }

      // if (
      //   typeImage != 'image/png' &&
      //   typeImage != 'image/jpg' &&
      //   typeImage != 'image/jpeg'
      //   ) {
      //   throw new Error('It's not image format!')
      //   }

      let getUserEmail: User | addUserTest | undefined
      let getUserName: User | addUserTest | undefined
      let hashPassword: string

      if (env) {
        getUserEmail = await UserRepository.getEmailTest(payload.email)

        getUserName = await UserRepository.getUserTest(payload.username)

        if (getUserEmail ?? getUserName) {
          throw new Error(`${getUserEmail ? 'Email' : 'Username'} already exist!`)
        }

        hashPassword = payload.password
      } else {
        getUserEmail = await UserRepository.getUserByEmail(payload.email)

        getUserName = await UserRepository.getUserByUsername(payload.username)

        if (getUserEmail || getUserName) {
          throw new Error(`${getUserEmail ? 'Email' : 'Username'} already exist!`)
        }

        const salt = await bcrypt.genSalt()
        hashPassword = await bcrypt.hash(payload.password, salt)
      }

      // const imageUrl = await cloudinary.uploader.upload(
      //   image,
      //   { folder: 'user' },
      //   function (err: any, result: any) {
      //     if (err) {
      //       throw new Error('Failed to upload image to cloudinary')
      //     }
      //     return result
      //   }
      // )
      const newUser: UserRequest = {
        email: payload.email,
        username: payload.username,
        password: hashPassword,
        // image_url: imageUrl.secure_url,
        role: payload.role ? payload.role : 'admin'
      }

      env ? await UserRepository.addUserTest(newUser) : await UserRepository.createUser(newUser)

      return newUser as User
    } catch (error: any) {
      throw error.message
    }
  }

  static async login (res: Response, payload: UserRequest): Promise<DefaultResponse> {
    try {
      const env: boolean = process.env.NODE_ENV === 'test'

      if (!payload.username || !payload.password) {
        throw new Error(`${!payload.username ? 'username' : !payload.password ? 'password' : null}  is required!`)
      }

      let getUsername: User | addUserTest | undefined

      if (env) {
        getUsername = await UserRepository.getUserTest(payload.username)
        if (!getUsername || !getUsername.password) {
          throw new Error('Username does not exist!')
        }

        const isPasswordCorret = payload.password === getUsername.password
        if (!isPasswordCorret) {
          throw new Error('Wrong password!')
        }
      } else {
        getUsername = await UserRepository.getUserByUsername(payload.username)
        if (!getUsername || !getUsername.password) {
          throw new Error('Username does not exist!')
        }

        const isPasswordCorret = await bcrypt.compare(payload.password, getUsername.password)

        if (!isPasswordCorret) {
          throw new Error('Wrong password!')
        }

        if (!process.env.SECRET_KEY) {
          const response: DefaultResponse = {
            status: {
              code: 500,
              response: 'error',
              message: 'Secret key is not defined in the environment variables!'
            }
          }
          return response
        }
      }

      const token = jwt.sign({ user: payload.username, role: getUsername?.role }, process.env.SECRET_KEY ?? 'rahasia', { expiresIn: '1h' })

      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: `${getUsername?.username} successfully login`
        },
        result: {
          token
        }
      }

      // res.cookie('Token', `Bearer ${token}`, {
      //   httpOnly: true,
      //   maxAge: 60 * 60 * 1000
      // })

      return response
    } catch (error: any) {
      throw error.message
    }
  }

  static async logout (res: Response): Promise<DefaultResponse> {
    // res.clearCookie('Token')
    const response: DefaultResponse = {
      status: {
        code: 200,
        response: 'success',
        message: 'User successfully logout'
      }
    }
    return response
  }

  static async currentUser (currentUser: string): Promise<CurrentUserResult> {
    try {
      const isUser = await UserRepository.getUserByUsername(currentUser)
      const getCar = await CarRepository.getCarByUsername(currentUser)
      if (isUser === undefined) {
        throw new Error('User does not exist!')
      }
      return {
        user: isUser,
        cars: getCar
      }
    } catch (error: any) {
      throw error.message
    }
  }

  static async listUser (role?: string): Promise<User[]> {
    let getUsers: User[]
    getUsers = await UserRepository.getUsers()
    if (role === 'admin') {
      getUsers = await UserRepository.getUsersByRole('superadmin')
    }
    return getUsers
  }

  static async loginGoogle (payload: string): Promise<DefaultResponse> {
    try {
      const client = new OAuth2Client(process.env.CLIENT_ID)
      const userInfo = await client.verifyIdToken({
        idToken: payload,
        audience: process.env.CLIENT_ID
      })

      const getUser = userInfo.getPayload()

      const getUserByEmail: User = await UserRepository.getUserByEmail(getUser?.email ?? '')

      if (getUserByEmail !== undefined) {
        const token = jwt.sign({ user: getUserByEmail.username, role: getUserByEmail.role }, process.env.SECRET_KEY ?? 'default-secret-key', { expiresIn: '1h' })

        const response: DefaultResponse = {
          status: {
            code: 200,
            response: 'success',
            message: `${getUserByEmail.username} successfully login`
          },
          result: {
            token
          }
        }
        return response
      } else {
        const token = jwt.sign({ user: getUser?.given_name, role: 'admin' }, process.env.SECRET_KEY ?? 'default-secret-key', { expiresIn: '1h' })

        const newUser: UserRequest = {
          email: getUser?.email,
          username: getUser?.given_name?.split(' ').join('').toLowerCase(),
          image_url: getUser?.picture,
          role: 'admin'
        }

        await UserRepository.createUser(newUser)

        const response: DefaultResponse = {
          status: {
            code: 200,
            response: 'success',
            message: `${newUser.username} successfully login`
          },
          result: {
            token
          }
        }
        return response
      }
    } catch (error: any) {
      throw error.message
    }
  }
}
