import jwt from "jsonwebtoken";

function generateToken(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return {
    accessToken,
    refreshToken,
  };
}

function validateAccessToken(token) {
  try {
    return jwt.verify(token, proccess.env.JWT_ACCESS_SECRET);
  } catch (e) {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    console.log(proccess.env.JWT_REFRESH_SECRET);
    return jwt.verify(token, proccess.env.JWT_REFRESH_SECRET); // не возвращает ничего ???
  } catch (e) {
    return null;
  }
}

export const tokenService = {
  generateToken,
  validateAccessToken,
  validateRefreshToken,
};
