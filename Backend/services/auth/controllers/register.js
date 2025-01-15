const { hashPassword } = require("../utils/PasswordManagement");
const { getUser, createUser } = require("../database/userQuery");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");

RESPONSE_MESSAGES.taskError = "An error occurred at register";
RESPONSE_MESSAGES.taskSuccess = "Register successfully";
RESPONSE_MESSAGES.userConflict = "User already exists";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }

    const existUser = await getUser(username);
    // Handling query error
    if (existUser.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.taskError,
        error: existUser.error,
      });
    }
    // Checking replication of username
    if (existUser) {
      return res.status(409).json({
        message: RESPONSE_MESSAGES.userConflict,
      });
    }

    const hashedPassword = await hashPassword(password);
    // Handling Failed to verify the password
    if (hashedPassword.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.taskError,
        error: hashedPassword.error,
      });
    }

    const newUser = await createUser(username, hashedPassword);
    // Handling query error
    if (newUser.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
        error: newUser.error,
      });
    }

    return res.status(201).json({
      message: RESPONSE_MESSAGES.taskSuccess,
    });
  } catch (error) {
    console.error("Error on registerController ->", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.taskError,
      error: error.message,
    });
  }
};

module.exports = { register };
