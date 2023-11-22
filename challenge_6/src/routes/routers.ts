import express from "express";
import Cars from "../controllers/cars";
import Users from "../controllers/users";
import handleImage from "../utils/uploadFile";
import UserMiddleware from "../middlewares/user";
import swaggerOptions from "../utils/swaggerOptions";
import swaggerJSDocs from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
const router = express.Router();

// For Login / Logout
router.post("/v1/register", handleImage, Users.register);
router.post("/v1/login", Users.login);
router.delete("/v1/logout", Users.logout);

// For Admin
router.get("/v1/admin", UserMiddleware.verifyToken, UserMiddleware.isAdmin, Users.getAll);
router.get("/v1/users", UserMiddleware.verifyToken, UserMiddleware.isAdmin, Users.listUser);

// For User
router.get("/v1/cars", UserMiddleware.verifyToken, Cars.listCar);
router.post("/v1/cars", handleImage, Cars.createCar);
router.get("/v1/cars/:id", Cars.getCarById);
router.delete("/v1/cars/:id", Cars.deleteCar);
router.patch("/v1/cars/:id", handleImage, Cars.updateCar);

// For Get Car of User
router.get("/v1/:user/cars", Users.getCarsByUser);

// Open API Documentation
const swaggerSpec: swaggerJSDocs.Options = swaggerJSDocs(swaggerOptions);
router.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));


export default router;