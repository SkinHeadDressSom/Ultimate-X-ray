const { decodeToken } = require("../utils/CookiesManagement");
const { getUserbyID } = require("../database/userQuery");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");

RESPONSE_MESSAGES.authError = "Authentication error";
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
    // Handling token decode error and token expired
    if (decoded.error || decoded.tokenExpired) {
      res.clearCookie("token");
      return res.status(401).json({
        message: RESPONSE_MESSAGES.invalidToken,
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
      res.clearCookie("token");
      return res.status(401).json({
        message: RESPONSE_MESSAGES.invalidToken,
      });
    }

    // token is valid -> pass to next middleware
    return next();
  } catch (error) {
    res.clearCookie("token");
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
