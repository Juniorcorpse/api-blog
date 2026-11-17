import { Router } from "express";
import * as authController from '../controllers/auth'

export const authRouters = Router();

authRouters.post('/signup', authController.signup);
authRouters.post('/signin', authController.signin);
//authRouters.post('validate', authController.validate);