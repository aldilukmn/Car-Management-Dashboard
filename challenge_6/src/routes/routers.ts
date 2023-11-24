import express from "express";
import Cars from "../controllers/cars";
import Users from "../controllers/users";
import handleImage from "../utils/uploadFile";
import UserMiddleware from "../middlewares/user";
import swaggerOptions from "../utils/swaggerOptions";
import swaggerJSDocs from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
const router = express.Router();

// For Super Admin
router.post("/v1/superadmin/login", Users.login);
router.post("/v1/superadmin/register", UserMiddleware.verifyToken, UserMiddleware.isSuperAdmin, handleImage, Users.register);
router.delete("/v1/superadmin/logout", UserMiddleware.verifyToken, Users.logout);

// For Register
router.post("/v1/user/register", handleImage, Users.register);

// For Super Admin to perform CRUD operations
router.get("/v1/superadmin/cars", UserMiddleware.verifyToken, UserMiddleware.isSuperAdmin, Users.getAll);
router.post("/v1/superadmin/cars", UserMiddleware.verifyToken, UserMiddleware.isSuperAdmin, handleImage, Cars.createCar);
router.patch("/v1/superadmin/cars/:id", UserMiddleware.verifyToken, UserMiddleware.isSuperAdmin, handleImage, Cars.updateCar);
router.delete("/v1/superadmin/cars/:id", UserMiddleware.verifyToken, UserMiddleware.isSuperAdmin, Cars.deleteCar);

// For Admin to perform CRUD operations
router.get("/v1/admin/cars", UserMiddleware.verifyToken, UserMiddleware.isAdmin, Users.getAll);
router.post("/v1/admin/cars", UserMiddleware.verifyToken, UserMiddleware.isAdmin, handleImage, Cars.createCar);
router.patch("/v1/admin/cars/:id", UserMiddleware.verifyToken, UserMiddleware.isAdmin, handleImage, Cars.updateCar);
router.delete("/v1/admin/cars/:id", UserMiddleware.verifyToken, UserMiddleware.isAdmin, Cars.deleteCar);

// For Current User
router.get("/v1/user/current", UserMiddleware.verifyToken, Users.currentUser);

// For Member
router.get("/v1/user/cars", UserMiddleware.verifyToken, Cars.listCar);

// For Anyone
router.get("/v1/cars", Cars.listCar);
router.get("/v1/cars/:id", Cars.getCarById);

// Open API Documentation
const swaggerSpec: swaggerJSDocs.Options = swaggerJSDocs(swaggerOptions);
router.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));


export default router;