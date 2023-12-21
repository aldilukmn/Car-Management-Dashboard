import { type Request, type Response } from 'express'
import * as jestMock from 'jest-mock'
import UsersService from '../../services/users'
import Users from '../users'
import type DefaultResponse from '../../models/dto/response'
import type User from '../../models/entity/user'
import Car from '../../models/entity/car'
const { mocked } = jestMock

jest.mock('../../services/users')

interface CurrentUserResult {
  user: User
  cars: Car
}

describe('User Controller', () => {
  const mockUsers: User[] = [
    {
      email: 'user1@example.com',
      username: 'user1',
      password: 'password1',
      role: 'admin'
    },
    {
      email: 'user2@example.com',
      username: 'user2',
      password: 'password2',
      role: 'user'
    },
    {
      email: 'user3@example.com',
      username: 'user3',
      password: 'password3',
      role: 'user'
    }
  ]

  it('should register a new user', async () => {
    const mockRequest: Partial<Request> = {
      body: {
        email: 'user@mail.com',
        username: 'user',
        password: 'user_password',
        image_url: 'admin.png',
        role: 'admin'
      }
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mocked(UsersService.register).mockResolvedValueOnce(mockRequest)

    await Users.register(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: {
        code: 201,
        response: 'success',
        message: 'User successfully created'
      },
      result: mockRequest
    })
  })

  it('should login a user', async () => {
    const mockRequest: Partial<Request> = {
      body: {
        username: 'user',
        password: 'user_password'
      }
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const response: DefaultResponse = {
      status: {
        code: 200,
        response: 'success',
        message: 'User successfully login'
      },
      result: mockRequest
    }

    mocked(UsersService.login).mockResolvedValueOnce(response)

    await Users.login(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: {
        code: 200,
        response: 'success',
        message: 'User successfully login'
      },
      result: mockRequest
    })
  })

  it('should success login a user with google oath', async () => {
    const mockRequest: Partial<Request> = {
      query: {
        access_token: 'mocked_access_token'
      }
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const response: DefaultResponse = {
      status: {
        code: 200,
        response: 'success',
        message: 'User successfully login'
      },
      result: mockRequest
    }

    mocked(UsersService.loginGoogle).mockResolvedValueOnce(response)

    await Users.loginGoogle(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: {
        code: 200,
        response: 'success',
        message: 'User successfully login'
      },
      result: mockRequest
    })
  })

  it('should fail login a user with google oath', async () => {
    const mockRequest: Partial<Request> = {
      query: {
        access_token: 'mocked_access_token'
      }
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const errorMessage: string = 'Car not found!'
    mocked(UsersService.loginGoogle).mockRejectedValue(new Error(errorMessage))

    const response: DefaultResponse = {
      status: {
        code: 400,
        response: 'fail',
        message: `Error: ${errorMessage}`
      }
    }

    await Users.loginGoogle(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith(response)
  })

  it('should success logout a user', async () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const response: DefaultResponse = {
      status: {
        code: 200,
        response: 'success',
        message: 'User successfully logout'
      }
    }

    mocked(UsersService.logout).mockResolvedValueOnce(response)

    await Users.logout(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: {
        code: 200,
        response: 'success',
        message: 'User successfully logout'
      }
    })
  })

  it('should fail logout a user', async () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const errorMessage: string = 'fail logout!'
    mocked(UsersService.logout).mockRejectedValue(new Error(errorMessage))

    const response: DefaultResponse = {
      status: {
        code: 400,
        response: 'fail',
        message: `Error: ${errorMessage}`
      }
    }

    await Users.logout(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith(response)
  })

  it('should get current user data', async () => {
    const thisUser: User = {
      id: 1,
      email: 'user@mail.com',
      username: 'user',
      role: 'admin'
    }
    const mockRequest: Partial<Request> = {}

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const response: CurrentUserResult = {
      user: thisUser,
      cars: mockUsers
    }

    mocked(UsersService.currentUser).mockResolvedValueOnce(response)
  })
})
