import { Router } from "express";
import * as authController from '../controllers/auth'
import { privateRoute } from "../middlewares/private-route";

export const authRouters = Router();

authRouters.post('/signup', authController.signup);
authRouters.post('/signin', authController.signin);
authRouters.post('/validate', privateRoute, authController.validate);