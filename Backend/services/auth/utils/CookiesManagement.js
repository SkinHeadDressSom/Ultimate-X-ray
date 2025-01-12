const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function createCookies(user_id) {
  return jwt.sign(user_id, String(process.env.SECRET_KEY), {
    algorithm: "HS256",
  });
}

function decodeToken(token) {
  return jwt.verify(token, String(process.env.SECRET_KEY));
}

module.exports = { createCookies, decodeToken };
