import type Car from '../../models/entity/car'
import CarsService from '../cars'
import CarRepository from '../../repositories/cars'

jest.mock('../../repositories/cars')

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
    updated_at: new Date().toISOString()
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
    updated_at: new Date().toISOString()
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
    updated_at: new Date().toISOString()
  }]

  const updateAtCar = mockCars.map((car) => {
    const getDate = new Date(car.updated_at)
    const monthName = getDate.toLocaleString('id-ID', { month: 'long' })
    const getTime = `${getDate.getDate()} ${monthName} ${getDate.getFullYear()}, ${getDate.toLocaleTimeString(
      'id-ID',
      { hour: '2-digit', minute: '2-digit' }
    )}`
    return {
      ...car,
      updated_at: getTime
    }
  })

  it('should list all cars', async () => {
    (CarRepository.getCarByAddedBy as jest.Mock).mockResolvedValue({
      cars: mockCars,
      total: mockCars.length
    })

    const result = await CarsService.listCar()

    expect(result.getCar).toEqual((mockCars.map((car) => {
      const getDate = new Date(car.updated_at)
      const monthName = getDate.toLocaleString('id-ID', { month: 'long' })
      const getTime = `${getDate.getDate()} ${monthName} ${getDate.getFullYear()}, ${getDate.toLocaleTimeString(
        'id-ID',
        { hour: '2-digit', minute: '2-digit' }
      )}`
      return {
        ...car,
        updated_at: getTime
      }
    })))
  })

  it('should list all cars for superadmin with searc', async () => {
    const size: string = 'small'
    const user: string = 'superadmin'
    const search: string = 'Avanza';
    (CarRepository.getAllCars as jest.Mock).mockResolvedValue({
      cars: mockCars,
      total: mockCars.length
    })

    const result = await CarsService.listCar(size, user, search)

    const expectedOutput = updateAtCar.filter(
      (car) => car.size === size && car.name.toLowerCase().includes(search.toLowerCase())
    )

    console.log(expectedOutput)

    expect(result.getCar).toEqual(expectedOutput)
  })
})
