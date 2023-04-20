import { Router } from "express";
import { userRouter } from "./userRouter.js";

export const appRouter = Router();

appRouter.use("/auth", userRouter);
