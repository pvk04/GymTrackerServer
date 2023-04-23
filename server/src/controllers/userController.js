import { userService } from "../services/userService.js";
import { validationResult } from "express-validator";
import { ApiError } from "../exeptions/apiError.js";

async function registration(req, res, next) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(ApiError.BadRequest("Ошибка при валидации"));
		}

		const { nickname, email, dateBirth, password } = req.body;
		const userData = await userService.registration(
			nickname,
			email,
			dateBirth,
			password
		);
		res.cookie("refreshToken", userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		return res.json(userData);
	} catch (e) {
		next(e);
	}
}

async function login(req, res, next) {
	try {
		const { email, password } = req.body;
		const userData = await userService.login(email, password);
		res.cookie("refreshToken", userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		return res.json(userData);
	} catch (e) {
		next(e);
	}
}

async function logout(req, res, next) {
	try {
		res.clearCookie("refreshToken");
	} catch (e) {
		next(e);
	}
}

async function activate(req, res, next) {
	try {
		const { link } = req.params;
		await userService.activate(link);

		return res.redirect(process.env.CLIENT_URL);
	} catch (e) {
		next(e);
	}
}

async function refresh(req, res, next) {
	try {
		const { refreshToken } = res.cookies;
		const userData = await userService.refresh(refreshToken);
		res.cookie("refreshToken", userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		return res.json(userData);
	} catch (e) {
		next(e);
	}
}

async function getUsers(req, res, next) {
	try {
	} catch (e) {
		next(e);
	}
}

export const userController = {
	registration,
	login,
	logout,
	activate,
	refresh,
	getUsers,
};
