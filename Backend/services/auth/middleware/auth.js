const { decodeToken } = require("../utils/CookiesManagement");
const { getUserbyID } = require("../database/userQuery");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");

RESPONSE_MESSAGES.authError = "Authentication error";
RESPONSE_MESSAGES.taskError = "An error occurred at auth";

const validateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Checking if token not found
    if (!token) {
      return res.status(401).json({
        message: RESPONSE_MESSAGES.invalidToken,
      });
    }

    const decoded = await decodeToken(token);
    // Check if the token has expired
    if (decoded.tokenExpired) {
      return res.status(401).json({
        message: RESPONSE_MESSAGES.invalidToken,
      });
    }
    // Handling token decode error
    if (decoded.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.taskError,
        error: decoded.error,
      });
    }

    const user = await getUserbyID(decoded);
    // Handling query error
    if (user?.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
        error: user.error,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: RESPONSE_MESSAGES.invalidToken,
      });
    }

    // token is valid -> pass to next middleware
    return next();
  } catch (error) {
    //console.log("function error:", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.authError,
    });
  }
};

const checkToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.clearCookie("token");
      return res.status(401).json({
        message: RESPONSE_MESSAGES.invalidToken,
      });
    }
    // if token is valid -> pass to next middleware
    return next();
  } catch (error) {
    return res.status(500).json({
      message: RESPONSE_MESSAGES.authError,
    });
  }
};
module.exports = { validateToken, checkToken };
