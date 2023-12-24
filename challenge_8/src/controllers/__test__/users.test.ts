import { type Request, type Response } from 'express'
import * as jestMock from 'jest-mock'
import UsersService from '../../services/users'
import Users from '../users'
import type DefaultResponse from '../../models/dto/response'
import type User from '../../models/entity/user'
import type Car from '../../models/entity/car'
import CarsService from '../../services/cars'
const { mocked } = jestMock

jest.mock('../../services/users')

interface CurrentUserResult {
  user: User
  cars: Car[]
}

interface CurrentCarResult {
  getCar: Car[]
  totalDataCar: number | undefined
  perPageNumber: number
  currentPageNumber: number
}

describe('User Controller', () => {
  const mockCars: Car[] = [{
    id: 1,
    name: 'Avanza',
    rent: 450000,
    size: 'small',
    image_url: 'avanza.png',
    added_by: 'aldi',
    created_by: 'admin',
    updated_by: 'admin',
    updated_at: '2023-11-24 22:51:57.802 +0700'
  },
  {
    id: 2,
    name: 'BMW',
    rent: 950000,
    size: 'medium',
    image_url: 'bmw.png',
    added_by: 'andy',
    created_by: 'admin',
    updated_by: 'admin',
    updated_at: '2023-11-24 22:51:57.802 +0700'
  },
  {
    id: 3,
    name: 'Fortuner',
    rent: 650000,
    size: 'large',
    image_url: 'fortuner.png',
    added_by: 'aldi',
    created_by: 'admin',
    updated_by: 'admin',
    updated_at: '2023-11-24 22:51:57.802 +0700'
  }]

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
    const mockRequest: Partial<Request> = {}

    const userReq: User = {
      email: 'user@mail.com',
      username: 'user',
      password: 'user_password',
      role: 'admin'
    }

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mocked(UsersService.register).mockResolvedValueOnce(userReq)

    await Users.register(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: {
        code: 201,
        response: 'success',
        message: 'User successfully created'
      },
      result: userReq
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

    jest.spyOn(UsersService, 'login').mockResolvedValueOnce(response)

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

    jest.spyOn(UsersService, 'loginGoogle').mockResolvedValueOnce(response)

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
    jest.spyOn(UsersService, 'loginGoogle').mockRejectedValue(new Error(errorMessage))

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
    const mockRequest: Partial<Request> = {}
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

    jest.spyOn(UsersService, 'logout').mockResolvedValueOnce(response)

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
    const mockRequest: Partial<Request> = {}
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const errorMessage: string = 'fail logout!'
    jest.spyOn(UsersService, 'logout').mockRejectedValue(new Error(errorMessage))

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

  it('should success get current user data', async () => {
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

    const mockUserData: CurrentUserResult = {
      user: thisUser,
      cars: mockCars
    }

    const response: DefaultResponse = {
      status: {
        code: 200,
        response: 'success',
        message: 'Data successfully retrieved'
      },
      result: {
        user: thisUser,
        cars: mockCars
      }
    }

    jest.spyOn(UsersService, 'currentUser').mockResolvedValueOnce(mockUserData)

    await Users.currentUser(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(response)
  })

  it('should fail get current user data', async () => {
    const mockRequest: Partial<Request> = {}

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const errorMessage: string = 'User does not exist!'

    const response: DefaultResponse = {
      status: {
        code: 400,
        response: 'fail',
        message: `Error: ${errorMessage}`
      }
    }

    jest.spyOn(UsersService, 'currentUser').mockRejectedValue(new Error(errorMessage))

    await Users.currentUser(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith(response)
  })

  it('should success get all data', async () => {
    const mockRequest: Partial<Request> = {
      query: {
        size: 'small',
        search: '',
        page: '1',
        perPage: '4'
      },
      role: 'admin',
      user: 'aldi'
    }

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockCarData: CurrentCarResult = {
      getCar: mockCars,
      totalDataCar: mockCars.length,
      perPageNumber: 4,
      currentPageNumber: 1
    }

    const response: DefaultResponse = {
      status: {
        code: 200,
        response: 'success',
        message: 'Data successfully retrieved'
      },
      result: {
        users: mockUsers,
        cars: mockCars,
        total_data_car: mockCarData.totalDataCar,
        current_page: mockCarData.currentPageNumber,
        per_page: mockCarData.perPageNumber
      }
    }

    jest.spyOn(UsersService, 'listUser').mockResolvedValueOnce(mockUsers)
    jest.spyOn(CarsService, 'listCar').mockResolvedValueOnce(mockCarData)

    await Users.getAll(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(response)
  })

  it('should fail get all data', async () => {
    const mockRequest: Partial<Request> = {
      query: {
        size: 'small',
        search: '',
        page: '1',
        perPage: '4'
      },
      role: 'admin',
      user: 'aldi'
    }

    const errorMessage: string = 'Data not found!'

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const response: DefaultResponse = {
      status: {
        code: 400,
        response: 'fail',
        message: `Error: ${errorMessage}`
      }
    }

    jest.spyOn(UsersService, 'listUser').mockRejectedValue(new Error(errorMessage))
    jest.spyOn(CarsService, 'listCar').mockRejectedValue(new Error(errorMessage))

    await Users.getAll(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith(response)
  })
})
