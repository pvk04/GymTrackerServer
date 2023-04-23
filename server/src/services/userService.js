import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import connection from "../database/index.js";
import { mailService } from "./mailService.js";
import { tokenService } from "./tokenService.js";
import { ApiError } from "../exeptions/apiError.js";

async function registration(nickname, email, dateBirth, password) {
	const [candidateEmail] = await connection.execute(
		`SELECT * from Users where UserEmail = '${email}'`
	);
	const [candidateNickname] = await connection.execute(
		`SELECT * from Users where UserNickname = '${nickname}'`
	);
	if (candidateEmail.length > 0) {
		throw ApiError.BadRequest(`Email адрес ${email} занят`);
	}
	if (candidateNickname.length > 0) {
		throw ApiError.BadRequest(`Никнейм ${nickname} занят`);
	}

	const hashPassword = await bcrypt.hash(password, 3);
	const activationLink = uuidv4();
	const [user] = await connection.execute(
		`INSERT INTO Users(UserNickname, UserDateBirth, UserEmail, UserPassword, UserEmailActivationLink) VALUES ('${nickname}', '${dateBirth}', '${email}', '${hashPassword}', '${activationLink}');`
	);
	await mailService.sendActivationMail(
		email,
		`${process.env.API_URL}/auth/activate/${activationLink}`
	);
	const tokens = tokenService.generateToken({
		id: user.insertId,
		nickname,
		email,
	});

	return {
		...tokens,
	};
}

async function login(email, password) {
	const [[user]] = await connection.execute(
		`SELECT * FROM users WHERE useremail = '${email}';`
	);

	if (!user) {
		throw ApiError.BadRequest("Пользователь с таким email не найден");
	}

	const isPassEqual = await bcrypt.compare(password, user.UserPassword);
	if (!isPassEqual) {
		throw ApiError.BadRequest("Неверный пароль");
	}

	const tokens = tokenService.generateToken({
		id: user.UserId,
		nickname: user.UserNickname,
		email: user.UserEmail,
	});

	return {
		...tokens,
	};
}

async function refresh(userId, refreshToken) {
	if (!refreshToken) {
		throw ApiError.UnauthorizedUser();
	}
	const userData = tokenService.validateRefreshToken(refreshToken);
	const [[user]] = await connection.execute(
		`SELECT * FROM users WHERE userid = ${userId};`
	);
	if (!userData || !user) {
		throw ApiError.UnauthorizedUser();
	}

	const tokens = tokenService.generateToken({
		id: user.UserId,
		nickname: user.UserNickname,
		email: user.UserEmail,
	});

	return {
		...tokens,
	};
}

async function activate(link) {
	const [
		user,
	] = `select * from users where UserEmailActivationLink = '${link}';`;
	if (user.length === 0) {
		throw ApiError.BadRequest("Ошибка активации");
	}

	const [response] = await connection.execute(
		`UPDATE users SET UserEmailActivated = 1 WHERE UserEmailActivationLink = '${link}';`
	);
}

export const userService = {
	registration,
	login,
	refresh,
	activate,
};
