import express from "express";
import Cars from "../controllers/cars";
import handleImage from "../utils/uploadFile";
const router = express.Router();

router.get("/v1/cars", Cars.listCar);
router.post("/v1/cars", handleImage, Cars.createCar);
router.get("/v1/cars/:id", Cars.getCar);
router.delete("/v1/cars/:id", Cars.deleteCar);
router.patch("/v1/cars/:id", handleImage, Cars.updateCar);

export default router;




// For reference

// router.patch("/v1/cars/:id", handleImage, Cars.upCar);
// router.delete("/v1/cars/:id", Cars.delCar);
// router.get("/v1/cars/:id", Cars.getCarById);
// router.get("/v1/cars", Cars.getCars);
// router.post("/v1/cars", handleImage, Cars.addNewCar);
// router.get('/cars/new-car', Cars.formAddNewCar);