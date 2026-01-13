import express from "express";
import AuthController from "../controllers/AuthController.js";
import validate_api_key from "../middlewares/api_key.middleware.js";

const router = express.Router();

router.post("/auth/login", validate_api_key, AuthController.login);
export default router;
