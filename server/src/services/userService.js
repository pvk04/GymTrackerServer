import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import connection from "../database/index.js";
import { mailService } from "./mailService.js";
import { tokenService } from "./tokenService.js";

async function registration(nickname, email, dateBirth, password) {
  const candidateEmail = await connection.execute(
    `SELECT * from Users where UserEmail = '${email}'`
  );
  const candidateNickname = await connection.execute(
    `SELECT * from Users where UserNickname = '${nickname}'`
  );

  console.log(candidateEmail.response);
  console.log(candidateNickname.response);

  if (candidateEmail) {
    throw new Error(`Email адрес ${email} занят`);
  }
  if (candidateNickname) {
    throw new Error(`Никнейм ${nickname} занят`);
  }

  const hashPassword = await bcrypt.hash(password, 3);
  const activationLink = uuidv4();
  const user = await connection.execute(
    `INSERT INTO Users(UserNickname, UserDateBirth, UserEmail, UserPassword) VALUES ('${nickname}', '${dateBirth}', '${email}', '${hashPassword}');`
  );
  console.log(user);
  //   await mailService.sendActivationMail(email, activationLink);
  //   const tokens = tokenService.generateToken({nickname, email})
}

export const userService = {
  registration,
};
