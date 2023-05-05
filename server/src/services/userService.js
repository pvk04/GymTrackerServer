import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import connection from "../database/index.js";
import { mailService } from "./mailService.js";
import { tokenService } from "./tokenService.js";
import { ApiError } from "../exeptions/apiError.js";
import { UserDto } from "../dtos/userDto.js";

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

  const userDto = {
    id: user.insertId,
    nickname,
    email,
    emailActivated: 0,
  };
  const tokens = tokenService.generateToken({ ...userDto });

  return {
    ...tokens,
    user: { ...userDto },
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

  const userDto = new UserDto(user);
  const tokens = tokenService.generateToken({ ...userDto });

  return {
    ...tokens,
    user: { ...userDto },
  };
}

async function refresh(refreshToken) {
  if (!refreshToken) {
    throw ApiError.UnauthorizedUser();
  }
  const userData = tokenService.validateRefreshToken(refreshToken); // должен возвращат декодированный токен и из него берем айди пользователя
  const [[user]] = await connection.execute(
    `SELECT * FROM users WHERE userid = ${userData.id};`
  );
  if (!userData || !user) {
    throw ApiError.UnauthorizedUser();
  }

  const userDto = new UserDto(user);
  const tokens = tokenService.generateToken({
    id: userDto.id,
    email: userDto.email,
    emailActivated: userDto.emailActivated,
  });

  return {
    ...tokens,
    user: { ...userDto },
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
