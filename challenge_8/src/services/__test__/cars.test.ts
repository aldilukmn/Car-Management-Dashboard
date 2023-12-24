import type Car from '../../models/entity/car'
import CarsService from '../cars'
import CarRepository from '../../repositories/cars'
import type { CarRequest } from '../../models/dto/car'
import cloudinary from '../../../config/cloudinary'
import type DefaultResponse from '../../models/dto/response'

jest.mock('../../repositories/cars')

describe('Car Service', () => {
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
    added_by: 'superadmin',
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

    expect(result.getCar).toEqual(updateAtCar)
  })

  it('should list all cars with search', async () => {
    const size: string = ''
    const user: string = ''
    const search: string = 'avanza';
    (CarRepository.getCarByAddedBy as jest.Mock).mockResolvedValue({
      cars: mockCars,
      total: mockCars.length
    })

    const result = await CarsService.listCar(size, user, search)

    const expectedOutput = updateAtCar.filter(
      (car) => car.name.toLowerCase().includes(search.toLowerCase())
    )

    expect(result.getCar).toEqual(expectedOutput)
  })

  it('should list all cars with size', async () => {
    const size: string = 'small'
    const user: string = ''
    const search: string = '';
    (CarRepository.getCarByAddedBy as jest.Mock).mockResolvedValue({
      cars: mockCars,
      total: mockCars.length
    })

    const result = await CarsService.listCar(size, user, search)

    const expectedOutput = updateAtCar.filter(
      (car) => car.size === size
    )

    expect(result.getCar).toEqual(expectedOutput)
  })

  it('should list all cars for superadmin with search', async () => {
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

    expect(result.getCar).toEqual(expectedOutput)
  })

  it('should success create a new car', async () => {
    const payload: CarRequest = {
      name: 'new car',
      rent: 500000,
      size: 'medium',
      image_url: 'mocked_image_url',
      added_by: 'admin',
      created_by: 'admin',
      updated_by: 'admin'
    }

    const image: string = 'image.jpg'
    const typeImage: string = 'image/png'
    const getUser: string = 'admin'
    const getRole: string = 'admin';

    (CarRepository.createCar as jest.Mock).mockResolvedValueOnce(payload)

    const mockUpload = jest.fn().mockResolvedValue({ secure_url: 'mocked_image_url' })

    cloudinary.uploader.upload = mockUpload

    const result = await CarsService.createCar(payload, image, typeImage, getUser, getRole)

    expect(result).toEqual(payload)
  })

  it('should fail create a new car with no image', async () => {
    const payload: CarRequest = {
      name: 'new car',
      rent: 500000,
      size: 'medium',
      image_url: 'mocked_image_url',
      added_by: 'admin',
      created_by: 'admin',
      updated_by: 'admin'
    }

    const image: string | undefined = undefined
    const typeImage: string = 'image/png'
    const getUser: string = 'admin'
    const getRole: string = 'admin';

    (CarRepository.createCar as jest.Mock).mockRejectedValue(payload)

    const mockUpload = jest.fn().mockResolvedValue({ secure_url: 'mocked_image_url' })

    cloudinary.uploader.upload = mockUpload

    let error: any
    try {
      await CarsService.createCar(payload, image, typeImage, getUser, getRole)
    } catch (e: any) {
      error = e
    }

    expect(error).toBeDefined()
    expect(error).toBe('image is required!')
  })

  it('should fail create a new car with not image format', async () => {
    const payload: CarRequest = {
      name: 'new car',
      rent: 500000,
      size: 'medium',
      image_url: 'mocked_image_url',
      added_by: 'admin',
      created_by: 'admin',
      updated_by: 'admin'
    }

    const image: string = 'image.jpg'
    const typeImage: string = 'text'
    const getUser: string = 'admin'
    const getRole: string = 'admin';

    (CarRepository.createCar as jest.Mock).mockResolvedValueOnce(payload)

    const mockUpload = jest.fn().mockResolvedValue({ secure_url: 'mocked_image_url' })

    cloudinary.uploader.upload = mockUpload

    let error: any

    try {
      await CarsService.createCar(payload, image, typeImage, getUser, getRole)
    } catch (e: any) {
      error = e
    }

    expect(error).toBeDefined()
    expect(error).toBe('It\'s not image format!')
  })

  it('should fail create a new car with cloudinary error', async () => {
    const payload: CarRequest = {
      name: 'new car',
      rent: 500000,
      size: 'medium',
      image_url: 'mocked_image_url',
      added_by: 'admin',
      created_by: 'admin',
      updated_by: 'admin'
    }

    const image: string = 'image.jpg'
    const typeImage: string = 'image/jpg'
    const getUser: string = 'admin'
    const getRole: string = 'admin'
    const errorMessage: string = 'Failed to upload image to cloudinary';

    (CarRepository.createCar as jest.Mock).mockResolvedValueOnce(payload)

    const mockUpload = jest.fn().mockRejectedValue(new Error(errorMessage))

    cloudinary.uploader.upload = mockUpload

    let error: any

    try {
      await CarsService.createCar(payload, image, typeImage, getUser, getRole)
    } catch (e: any) {
      error = e
    }

    expect(error).toBe('Failed to upload image to cloudinary')
  })

  it('should success get a car by id', async () => {
    const byId: number = 1;
    (CarRepository.getCarById as jest.Mock).mockResolvedValue(mockCars[byId])

    const result = await CarsService.getCarById(byId)

    expect(result).toEqual(updateAtCar[byId])
  })

  it('should fail get a car by id', async () => {
    const byId: number = mockCars.length;
    (CarRepository.getCarById as jest.Mock).mockResolvedValue(mockCars[byId])

    let error: any

    try {
      await CarsService.getCarById(byId)
    } catch (e: any) {
      error = e
    }

    expect(error).toBe('Car not found!')
  })

  it('should success delete a car by id', async () => {
    const byId: number = 1;
    (CarRepository.getCarById as jest.Mock).mockResolvedValue(mockCars[byId]);

    (CarRepository.updateCar as jest.Mock).mockResolvedValue(mockCars[byId])

    const user: string = 'andy'
    const role: string = 'admin'

    const result = await CarsService.deleteCar(byId, user, role)

    const response: DefaultResponse = {
      status: {
        code: 200,
        response: 'success',
        message: 'Car has been deleted'
      }
    }

    expect(result).toEqual(response)
  })

  it('should fail delete a car by id not found', async () => {
    const byId: number = mockCars.length;
    (CarRepository.getCarById as jest.Mock).mockResolvedValue(mockCars[byId]);

    (CarRepository.updateCar as jest.Mock).mockResolvedValue(mockCars[byId])

    const user: string = 'andy'
    const role: string = 'admin'

    let error: any

    try {
      await CarsService.deleteCar(byId, user, role)
    } catch (e: any) {
      error = e
    }

    expect(error).toBe('Car not found!')
  })

  it('should fail delete a car by id with not superadmin', async () => {
    const byId: number = mockCars.length - 1;
    (CarRepository.getCarById as jest.Mock).mockResolvedValue(mockCars[byId]);

    (CarRepository.updateCar as jest.Mock).mockResolvedValue(mockCars[byId])

    const user: string = 'andy'
    const role: string = 'admin'

    let error: any

    try {
      await CarsService.deleteCar(byId, user, role)
    } catch (e: any) {
      error = e
    }

    expect(error).toBe('delete denied for non-super admin user!')
  })

  it('should fail delete a car by id with not superadmin', async () => {
    const byId: number = 0;
    (CarRepository.getCarById as jest.Mock).mockResolvedValue(mockCars[byId]);

    (CarRepository.updateCar as jest.Mock).mockResolvedValue(mockCars[byId])

    const user: string = 'andy'
    const role: string = 'admin'

    let error: any

    try {
      await CarsService.deleteCar(byId, user, role)
    } catch (e: any) {
      error = e
    }

    expect(error).toBe('delete denied for not your data!')
  })

  it('should success update a car', async () => {
    const payload: CarRequest = {
      name: 'new car',
      rent: 500000,
      size: 'medium',
      image_url: 'mocked_image_url',
      updated_by: 'admin',
      updated_at: '2023-12-24T14:23:08.457Z'
    }

    const carId: number = 1;
    (CarRepository.getCarById as jest.Mock).mockResolvedValue(mockCars[carId])

    const imageUrl: string = 'mocked_image_url'
    const getRole: string = 'admin'

    const mockUpload = jest.fn().mockResolvedValue({ secure_url: 'mocked_image_url' })

    cloudinary.uploader.upload = mockUpload

    const result = await CarsService.saveUpdate({ payload, carId, imageUrl, getRole });

    (CarRepository.updateCar as jest.Mock).mockResolvedValue(mockCars[carId])

    expect(result.name).toEqual(payload.name)
  })
})
