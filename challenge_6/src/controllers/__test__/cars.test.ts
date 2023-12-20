import type { Request, Response } from 'express'
import * as jestMock from 'jest-mock'
import type Car from '../../models/entity/car'
import CarsService from '../../services/cars'
import Cars from '../cars'
const { mocked } = jestMock
jest.mock('../../services/cars')

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
})
