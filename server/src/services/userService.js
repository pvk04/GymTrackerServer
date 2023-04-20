import bcrypt from 'bcrypt';
import uuid from 'uuid';
import connection from '../database/index.js';
import { mailService } from './mailService.js';

async function registration(nickname, email, dateBirth, password) {
	const candidateEmail = await connection.execute(
		`SELECT * from Users where UserEmail = '${email}'`
	);
	const candidateNickname = await connection.execute(
		`SELECT * from Users where UserNickname = '${nickname}'`
	);

	if (candidateEmail) {
		throw new Error(`Email адрес ${email} занят`);
	}
	if (candidateNickname) {
		throw new Error(`Никнейм ${nickname} занят`);
	}

	const hashPassword = await bcrypt.hash(password, 3);
	const activationLink = uuid.v4();
  await mailService.sendActivationMail(email, activationLink);
}
