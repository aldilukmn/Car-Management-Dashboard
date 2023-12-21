import { type Request, type Response } from 'express'
import * as jestMock from 'jest-mock'
import type Car from '../../models/entity/car'
import CarsService from '../../services/cars'
import Cars from '../cars'
import type DefaultResponse from '../../models/dto/response'
const { mocked } = jestMock

jest.mock('../../services/cars')
jest.mock('../../../config/cloudinary')

describe('Car Controller', () => {
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

  it('should return list of cars', async () => {
    const mockRequest: Partial<Request> = {}
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mocked(CarsService.listCar).mockResolvedValueOnce({
      getCar: mockCars,
      totalDataCar: mockCars.length,
      perPageNumber: 4,
      currentPageNumber: 1
    })

    await Cars.listCar(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
  })

  it('should return non - list of cars', async () => {
    const mockRequest: Partial<Request> = {}
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const errorMessage: string = 'Something went wrong!'
    mocked(CarsService.listCar).mockRejectedValue(new Error(errorMessage))

    await Cars.listCar(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: {
        code: 400,
        response: 'error',
        message: `Error: ${errorMessage}`
      }
    })
  })

  it('should create a new car successfully', async () => {
    const mockRequest: Partial<Request> = {
      body: {
        name: 'Toyota Camry',
        rent: 500000,
        size: 'medium',
        image_url: 'Camry.png',
        added_by: 'sandy',
        created_by: 'admin',
        updated_by: 'admin',
        updated_at: '2023-11-24 22:51:57.802 +0700'
      }
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mocked(CarsService.createCar).mockResolvedValueOnce(mockRequest)

    await Cars.createCar(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: {
        code: 201,
        response: 'success',
        message: 'Car successfully created'
      },
      result: mockRequest
    })
  })

  it('should return error of a new car', async () => {
    const mockRequest: Partial<Request> = {
      body: {
        name: 'Toyota Camry',
        rent: 500000,
        size: 'medium',
        image_url: 'Camry.png',
        added_by: 'sandy',
        created_by: 'admin',
        updated_by: 'admin',
        updated_at: '2023-11-24 22:51:57.802 +0700'
      }
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const errorMessage: string = 'Something went wrong!'
    mocked(CarsService.createCar).mockRejectedValue(new Error(errorMessage))

    await Cars.createCar(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: {
        code: 400,
        response: 'fail',
        message: `Error: ${errorMessage}`
      }
    })
  })

  it('should return a car by id', async () => {
    const carId: number = 1
    const getCarById: Car | undefined = mockCars.find((car) => car.id === carId)
    const mockRequest: Partial<Request> = {
      params: {
        id: carId.toString()
      }
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    if (getCarById) {
      mocked(CarsService.getCarById).mockResolvedValueOnce(getCarById)
    }

    await Cars.getCarById(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: {
        code: 200,
        response: 'success',
        message: 'Car has found'
      },
      result: getCarById
    })
  })

  it('should return fail when a car not found', async () => {
    const mockRequest: Partial<Request> = {
      params: {
        id: '4'
      }
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const errorMessage: string = 'Car not found!'
    mocked(CarsService.getCarById).mockRejectedValue(new Error(errorMessage))

    await Cars.getCarById(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: {
        code: 404,
        response: 'fail',
        message: `Error: ${errorMessage}`
      }
    })
  })

  it('should return success when a car deleted', async () => {
    const carId: number = 1
    const getUser: string = 'user'
    const getRole: string = 'admin'
    const response: DefaultResponse = {
      status: {
        code: 200,
        response: 'success',
        message: 'Car has been deleted'
      }
    }
    const getCarById: Car | undefined = mockCars.find((car) => car.id === carId)
    const mockRequest: Partial<Request> = {
      params: {
        id: carId.toString()
      },
      user: getUser,
      role: getRole
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    if (getCarById) {
      mocked(CarsService.deleteCar).mockResolvedValueOnce(response)
    }

    await Cars.deleteCar(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(response)
  })

  it('should return fail when a car not found on delete car', async () => {
    const carId: number = 1
    const getUser: string = 'user'
    const getRole: string = 'admin'
    const response: DefaultResponse = {
      status: {
        code: 400,
        response: 'fail',
        message: 'Error: Car not found!'
      }
    }
    const mockRequest: Partial<Request> = {
      params: {
        id: carId.toString()
      },
      user: getUser,
      role: getRole
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const errorMessage: string = 'Car not found!'
    mocked(CarsService.deleteCar).mockRejectedValue(new Error(errorMessage))

    await Cars.deleteCar(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith(response)
  })

  it('should return success when a car is updated', async () => {
    const carId: number = 1
    const mockRequest: Partial<Request> = {
      params: {
        id: carId.toString()
      },
      body: {
        name: 'Mobil Diupdate'
      }
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mocked(CarsService.updateCar).mockResolvedValueOnce(mockCars[0])

    await Cars.updateCar(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: {
        code: 200,
        response: 'success',
        message: 'Car successfully updated'
      },
      result: mockCars[0]
    })
  })

  it('should return fail when a car is updated', async () => {
    const carId: number = 1
    const mockRequest: Partial<Request> = {
      params: {
        id: carId.toString()
      },
      body: {
        name: 'Mobil Diupdate'
      }
    }
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const response: DefaultResponse = {
      status: {
        code: 400,
        response: 'fail',
        message: 'Error: Car not found!'
      }
    }

    const errorMessage: string = 'Car not found!'
    mocked(CarsService.updateCar).mockRejectedValue(new Error(errorMessage))

    await Cars.updateCar(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith(response)
  })
})
