import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { body } from "express-validator";

export const userRouter = Router();

userRouter.post(
	"/registration",
	body("email").isEmail(),
	body("password").isLength({ min: 6, max: 24 }),
	body("nickname").isLength({ min: 3, max: 20 }),
	userController.registration
);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/activate/:link", userController.activate);
userRouter.get("/refresh", userController.refresh);
userRouter.get("/users", userController.getUsers);
