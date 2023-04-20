import { Router } from 'express';
import { userController } from '../controllers/userController.js';

export const userRouter = Router();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/activate/:link', userController.activate);
userRouter.get('/refresh', userController.refresh);
userRouter.get('/users', userController.getUsers);
