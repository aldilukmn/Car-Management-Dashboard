import type User from '../../models/entity/user'
import UsersService from '../users'
import type UserRequest from '../../models/dto/user'
import UserRepository from '../../repositories/users'
import type DefaultResponse from '../../models/dto/response'
import type { Response } from 'express'
jest.mock('../../repositories/users')

describe('User Service', () => {
  const mockUsers: User[] = [{
    id: 1,
    email: 'user@example.com',
    username: 'user',
    password: 'userpassword',
    role: 'admin'
  },
  {
    id: 2,
    email: 'user2@example.com',
    username: 'user2',
    password: 'user2password',
    role: 'superadmin'
  },
  {
    id: 3,
    email: 'user3@example.com',
    username: 'user3',
    password: 'user3password',
    role: 'member'
  },
  {
    id: 4,
    email: 'user4@example.com',
    username: 'user4',
    password: 'user4password',
    role: 'admin'
  }]
  it('should success user register', async () => {
    const payload: UserRequest = {
      email: 'aldi@mail.com',
      username: 'aldi',
      password: 'aldi12345',
      role: 'admin'
    };
    (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUsers[1])

    const result = await UsersService.register(payload)

    expect(result).toEqual(payload)
  })

  it('should fail user register with no email', async () => {
    const payload: UserRequest = {
      email: '',
      username: 'aldi',
      password: 'aldi12345',
      role: 'admin'
    };
    (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUsers[1])

    let error: any

    try {
      await UsersService.register(payload)
    } catch (e: any) {
      error = e
    }

    expect(error).toBe('email is required!')
  })

  it('should fail user register with no email format', async () => {
    const payload: UserRequest = {
      email: 'aldimail.com',
      username: 'aldi',
      password: 'aldi12345',
      role: 'admin'
    };
    (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUsers[1])

    let error: any

    try {
      await UsersService.register(payload)
    } catch (e: any) {
      error = e
    }

    expect(error).toBe('Not email format!')
  })

  it('should fail user login with no username', async () => {
    const payload: UserRequest = {
      username: '',
      password: 'user2password'
    };
    (UserRepository.getUserByUsername as jest.Mock).mockResolvedValue(mockUsers[1])

    let error: any

    try {
      await UsersService.login(payload)
    } catch (er: any) {
      error = er
    }

    expect(error).toBe('username is required!')
  })

  it('should fail user login does not exist!', async () => {
    const payload: UserRequest = {
      username: 'user2',
      password: 'user2password'
    };
    (UserRepository.getUserByUsername as jest.Mock).mockResolvedValue(mockUsers[1])

    let error: any

    try {
      await UsersService.login(payload)
    } catch (er: any) {
      error = er
    }

    expect(error).toBe('Username does not exist!')
  })

  it('should success user register', async () => {
    const response: DefaultResponse = {
      status: {
        code: 200,
        response: 'success',
        message: 'User successfully logout'
      }
    }

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const result = await UsersService.logout(mockResponse as Response)

    expect(result).toEqual(response)
  })
})
