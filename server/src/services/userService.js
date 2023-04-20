import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import connection from "../database/index.js";
import { mailService } from "./mailService.js";
import { tokenService } from "./tokenService.js";

async function registration(nickname, email, dateBirth, password) {
	const [candidateEmail] = await connection.execute(
		`SELECT * from Users where UserEmail = '${email}'`
	);
	const [candidateNickname] = await connection.execute(
		`SELECT * from Users where UserNickname = '${nickname}'`
	);

	console.log(candidateEmail);
	console.log(candidateNickname);

	if (candidateEmail.length > 0) {
		throw new Error(`Email адрес ${email} занят`);
	}
	if (candidateNickname.length > 0) {
		throw new Error(`Никнейм ${nickname} занят`);
	}

	const hashPassword = await bcrypt.hash(password, 3);
	console.log(hashPassword.length);
	const activationLink = uuidv4();
	const [user] = await connection.execute(
		`INSERT INTO Users(UserNickname, UserDateBirth, UserEmail, UserPassword) VALUES ('${nickname}', '${dateBirth}', '${email}', '${hashPassword}');`
	);
	await mailService.sendActivationMail(email, activationLink);
	const tokens = tokenService.generateToken({
		id: user.insertId,
		nickname,
		email,
	});

	return {
		...tokens,
	};
}

export const userService = {
	registration,
};
