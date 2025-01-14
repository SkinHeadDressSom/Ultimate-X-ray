const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function createToken(user_id) {
  try {
    return jwt.sign(user_id, String(process.env.SECRET_KEY), {
      algorithm: "HS256",
    });
  } catch (error) {
    console.error("Failed to create cookies:", error.message);
    return null;
  }
}

const decodeToken = async (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.error("Failed to decode token:", error.message);
    return null; // Return null for invalid tokens
  }
};

module.exports = { createToken, decodeToken };
