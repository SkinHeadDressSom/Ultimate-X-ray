const { decodeToken } = require("../utils/CookiesManagement");
const { getUserbyID } = require("../database/userQuery");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");
const validateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("==== No token found, proceeding to login ====");
      return next(); // Token not found, continue to the next middleware (login)
    }

    // Decode and verify the token
    const decoded = await decodeToken(token);
    if (!decoded) {
      console.log("==== Invalid token, proceeding to login ====");
      return next(); // Invalid token, continue to the next middleware (login)
    }

    const user = await getUserbyID(decoded);
    console.log("decoded:", decoded);
    console.log("user:", user);
    if (!user) {
      console.log("==== User not found, proceeding to login ====");
      return next(); // No user found, continue to the next middleware (login)
    }

    // Token is valid, user is authenticated, skip login
    console.log("==== User authenticated, skipping login ====");
    return res.status(200).json({
      message: "User already logged in",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.log("Token check error:", error.message);
    return next(); // Proceed to login in case of error
  }
};

module.exports = { validateToken };
