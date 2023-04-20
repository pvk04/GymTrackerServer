import { Router } from 'express';
import { authController } from '../controllers/authController.js';

export const authRouter = Router();

authRouter.get('/registration', authController.registration);
authRouter.post('/login', authController.login);
