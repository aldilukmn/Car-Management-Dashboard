import db from '../../../config/knex'
import * as jestMock from 'jest-mock'
import CarRepository from '../cars'
import type Car from '../../models/entity/car'
const { mocked } = jestMock
jest.mock('../../../config/knex')

describe('Car Repository', () => {
  const mockCar: Car[] = [{
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

  const createMockQueryBuilder = (mockData: Car[]): any => ({
    where: jest.fn().mockImplementation((condition) => {
      if (condition.added_by) {
        const filteredCars = mockData.filter((car) => car.added_by === condition.added_by)
        return { select: jest.fn().mockResolvedValueOnce(filteredCars) }
      } else if (condition.id) {
        const getCarById = mockData.find((car) => car.id === condition.id)
        return { first: jest.fn().mockResolvedValueOnce(getCarById) }
      }
    })
  })

  it('should return car when getCarById is called with a valid data', async () => {
    const mockQueryBuilder = createMockQueryBuilder(mockCar)
    mocked(db).mockReturnValueOnce(mockQueryBuilder)
    const carId: number = 1

    const result = await CarRepository.getCarById(carId)

    expect(result).toBeInstanceOf(Object)
    expect(result.id).toEqual(1)
  })

  it('should return car when getCarByUsername is called with a valid data', async () => {
    const mockQueryBuilder = createMockQueryBuilder(mockCar)
    mocked(db).mockReturnValueOnce(mockQueryBuilder)
    const byUsername: string = 'aldi'

    const result = await CarRepository.getCarByUsername(byUsername)

    expect(result).toBeInstanceOf(Array)
    expect(result.some((car) => car.added_by === 'aldi')).toBe(true)
  })

  it('should add a new car to mockUser when needed', async () => {
    const newCar: Car = {
      id: 4,
      name: 'NewCar',
      rent: 800000,
      size: 'large',
      image_url: 'newcar.png',
      added_by: 'testuser',
      created_by: 'admin',
      updated_by: 'admin',
      updated_at: '2023-12-20 12:00:00.000 +0000'
    }

    const mockQueryBuilder = {
      insert: jest.fn().mockImplementation(() => true)
    }

    mocked(db).mockReturnValueOnce(mockQueryBuilder)

    const result = await CarRepository.createCar(newCar)
    mockCar.push(result)

    expect(mockQueryBuilder.insert).toHaveBeenCalledWith(newCar)
    expect(result).toEqual(true)
    expect(mockCar.length).toEqual(4)
  })

  it('should delete a car', async () => {
    const mockQueryBuilder = {
      where: jest.fn().mockReturnThis(),
      del: jest.fn().mockImplementation(() => true)
    }
    const delById: number = 1
    mocked(db).mockReturnValueOnce(mockQueryBuilder)

    const result = await CarRepository.deleteCar(delById)

    expect(result).toEqual(true)
  })

  it('should delete a car', async () => {
    const updateCar: Car = {
      id: 2,
      name: 'BEEMWE',
      rent: 950000,
      size: 'medium',
      image_url: 'bmw.png',
      added_by: 'andy',
      created_by: 'admin',
      updated_by: 'admin',
      updated_at: '2023-11-24 22:51:57.802 +0700'
    }

    const mockQueryBuilder = {
      where: jest.fn().mockReturnThis(),
      update: jest.fn().mockImplementation(() => true)
    }
    const delById: number = 1
    mocked(db).mockReturnValueOnce(mockQueryBuilder)

    const result = await CarRepository.updateCar(delById, updateCar)
    const index = mockCar.findIndex(obj => {
      return obj.id === updateCar.id
    })

    mockCar[index].name = updateCar.name

    expect(result).toEqual(true)
    expect(mockCar[index]).toEqual(updateCar)
  })
})
