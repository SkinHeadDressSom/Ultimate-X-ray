const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function createToken(user_id) {
  try {
    return await jwt.sign({ user_id }, String(process.env.SECRET_KEY), {
      algorithm: "HS256",
      expiresIn: "1h",
    });
  } catch (error) {
    console.error("Failed to create cookies:", error.message);
    // return error object
    return {
      error: error.message,
    };
  }
}

const decodeToken = async (token) => {
  try {
    return await jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.error("Failed to decode token:", error.message);
    return {
      error: error.message,
      tokenExpired: error.name === "TokenExpiredError" ? true : false,
    }; // General error
  }
};

module.exports = { createToken, decodeToken };
