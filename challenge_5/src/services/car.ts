import carDAO from "../dao/car";

class CarService {
  createCar(carDto: any, carImg: any) {
    const { name, rent, size } = carDto;
    const { image } = carImg
    return carDAO.createCar(name, rent, size, image);
  }
}


export default new CarService();