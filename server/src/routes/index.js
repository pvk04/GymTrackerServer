import { Router } from 'express';
import { authRouter } from './authRouter.js';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
