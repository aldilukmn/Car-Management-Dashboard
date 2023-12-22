import type { Response } from 'express'
import type { CarRequest, saveUpdate } from '../models/dto/car'
import type DefaultResponse from '../models/dto/response'
import type Car from '../models/entity/car'
import CarRepository from '../repositories/cars'
import cloudinary from '../../config/cloudinary'

interface CurrentCarResult {
  getCar: Car[]
  totalDataCar: number | undefined
  perPageNumber: number
  currentPageNumber: number
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class CarsService {
  static listCar = async (size?: string, user?: string, search?: string, currentPage?: string, perPage?: string): Promise<CurrentCarResult> => {
    let getCar: Car[]
    let totalDataCar: number | undefined
    const currentPageNumber = Number(currentPage) || 1 as number
    const perPageNumber = Number(perPage) || 4 as number

    const getOffSet: number = (currentPageNumber - 1) * perPageNumber

    if (user === 'superadmin') {
      const getData = await CarRepository.getAllCars(getOffSet, perPageNumber)
      getCar = getData.cars
      totalDataCar = getData.total
    } else {
      const getData = await CarRepository.getCarByAddedBy(getOffSet, perPageNumber, user)
      getCar = getData.cars
      totalDataCar = getData.total
    }

    getCar.sort((a, b) => {
      const dateA = new Date(a.updated_at).getTime()
      const dateB = new Date(b.updated_at).getTime()
      return dateB - dateA
    })

    const convertUpdate = getCar.map((car) => {
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

    if (search) {
      const searchResults = convertUpdate.filter((car) =>
        car.name.toLowerCase().includes(search.toLowerCase())
      )
      getCar = size
        ? searchResults
          .filter((car) => car.size === size)
          .map((car) => ({
            id: car.id,
            name: car.name,
            rent: car.rent,
            size: car.size,
            image_url: car.image_url,
            added_by: car.added_by,
            created_by: car.created_by,
            updated_by: car.updated_by,
            updated_at: car.updated_at
          }))
        : searchResults.map((car) => ({
          id: car.id,
          name: car.name,
          rent: car.rent,
          size: car.size,
          image_url: car.image_url,
          added_by: car.added_by,
          created_by: car.created_by,
          updated_by: car.updated_by,
          updated_at: car.updated_at
        }))

      totalDataCar = getCar.length
    } else if (size) {
      getCar = convertUpdate.filter((car) => car.size === size).map((car) => ({
        id: car.id,
        name: car.name,
        rent: car.rent,
        size: car.size,
        image_url: car.image_url,
        added_by: car.added_by,
        created_by: car.created_by,
        updated_by: car.updated_by,
        updated_at: car.updated_at
      }))
      totalDataCar = getCar.length
    } else {
      getCar = convertUpdate.map((car) => ({
        id: car.id,
        name: car.name,
        rent: car.rent,
        size: car.size,
        image_url: car.image_url,
        added_by: car.added_by,
        created_by: car.created_by,
        updated_by: car.updated_by,
        updated_at: car.updated_at
      }))
    }

    return {
      getCar,
      totalDataCar,
      perPageNumber,
      currentPageNumber
    }
  }

  static createCar = async (payload: CarRequest, image: string | undefined, typeImage: any, getUser: string, getRole: string): Promise<CarRequest> => {
    try {
      if (!payload.name || !payload.rent || !payload.size || !image) {
        throw new Error(`${
          !payload.name
            ? 'name'
            : !payload.rent
            ? 'rent'
            : !payload.size
            ? 'size'
            : !image
            ? 'image'
            : null
          } is required!`)
      }
      if (
        typeImage !== 'image/png' &&
        typeImage !== 'image/jpg' &&
        typeImage !== 'image/jpeg'
      ) {
        throw new Error('It\'s not image format!')
      }
      const imageUrl = await cloudinary.uploader.upload(image, { folder: 'dump' },
        function (err: any, result: any) {
          if (err) {
            throw new Error('Failed to upload image to cloudinary')
          }
          return result
        }
      )
      const newCar: CarRequest = {
        name: payload.name.toLowerCase(),
        rent: payload.rent,
        size: payload.size.toLocaleLowerCase(),
        image_url: imageUrl.secure_url,
        added_by: getUser,
        created_by: getRole,
        updated_by: getRole
      }
      await CarRepository.createCar(newCar)
      return newCar
    } catch (error: any) {
      throw error.message
    }
  }

  static getCarById = async (carId: number): Promise<Car> => {
    try {
      const getCar = await CarRepository.getCarById(carId)
      const { id, name, rent, size, image_url, added_by, created_by, updated_by, updated_at } = getCar
      if (!getCar) {
        throw new Error('Car not found')
      }

      const getDate = new Date(updated_at)
      const monthName = getDate.toLocaleString('id-ID', { month: 'long' })
      const getTime = `${getDate.getDate()} ${monthName} ${getDate.getFullYear()}, ${getDate.toLocaleTimeString(
        'id-ID',
        { hour: '2-digit', minute: '2-digit' }
      )}`

      const transformedCar: Car = {
        id,
        name,
        rent,
        size,
        image_url,
        added_by,
        created_by,
        updated_by,
        updated_at: getTime
      }
      return transformedCar
    } catch (error: any) {
      throw error.message
    }
  }

  static deleteCar = async (carId: number, getUser: string, getRole: string): Promise<DefaultResponse> => {
    const deletedBy = getUser
    try {
      const getCar = await CarRepository.getCarById(carId)
      if (!getCar) {
        throw new Error('Car not found!')
      }
      if (getCar.added_by === 'superadmin' && getRole !== 'superadmin') {
        throw new Error('delete denied for non-super admin user!')
      }

      if (getUser !== getCar.added_by && getUser !== 'superadmin') {
        throw new Error('delete denied for not your data!')
      }

      const updateCar: CarRequest = {
        deleted_by: deletedBy,
        is_deleted: true,
        deleted_at: new Date().toISOString()
      }

      const deleteCar = await CarRepository.updateCar(carId, updateCar)

      if (!deleteCar) {
        throw new Error('Car not found!')
      }

      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: 'Car has been deleted'
        }
      }

      return response
    } catch (error: any) {
      throw error.message
    }
  }

  static updateCar = async (res: Response, payload: CarRequest, carId: number, image: string | undefined, typeImage?: any, getUser?: string, getRole?: string): Promise<Car> => {
    let carUpdate: CarRequest
    try {
      const getCar = await CarRepository.getCarById(carId)
      if (!getCar) {
        throw new Error('Car not found!')
      }

      if (getCar.created_by === 'superadmin' && getRole !== 'superadmin') {
        throw new Error('update denied for non-super admin user!')
      }

      if (getUser !== getCar.added_by && getUser !== 'superadmin') {
        throw new Error('update denied for not your data!')
      }

      if (image) {
        if (
          typeImage !== 'image/png' &&
          typeImage !== 'image/jpg' &&
          typeImage !== 'image/jpeg'
        ) {
          throw new Error('It\'s not image format!')
        }
        const result = await cloudinary.uploader.upload(
          image,
          { folder: 'dump' },
          async function (error: any, result: any) {
            if (error) {
              throw new Error('Failed to upload image to cloudinary')
            }
            return result
          }
        )

        const imageUrl = result.secure_url
        carUpdate = await CarsService.saveUpdate({ payload, imageUrl, carId, getRole })
      } else {
        carUpdate = await CarsService.saveUpdate({ payload, carId, getRole })
      }
      return carUpdate as Car
    } catch (error: any) {
      throw error.message
    }
  }

  static async saveUpdate (options: saveUpdate): Promise<CarRequest> {
    const { payload, imageUrl, carId, getRole } = options
    const updateCar: CarRequest = {
      name: payload.name,
      rent: payload.rent,
      size: payload.size?.toLowerCase(),
      image_url: imageUrl,
      updated_by: getRole,
      updated_at: new Date().toISOString()
    }
    await CarRepository.updateCar(carId, updateCar)
    return updateCar
  }
}
