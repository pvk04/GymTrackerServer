import { userService } from "../services/userService.js";

async function registration(req, res, next) {
	try {
		const { nickname, email, dateBirth, password } = req.body;
		userService.registration(nickname, email, dateBirth, password);
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Registration error" });
	}
}

async function login(req, res, next) {
	try {
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Login error" });
	}
}

async function logout(req, res, next) {
	try {
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Login error" });
	}
}

async function activate(req, res, next) {
	try {
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Login error" });
	}
}

async function refresh(req, res, next) {
	try {
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Login error" });
	}
}

async function getUsers(req, res, next) {
	try {
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Login error" });
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
