const { hashPassword } = require("../utils/PasswordManagement");
const { getUser, createUser } = require("../database/userQuery");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");

RESPONSE_MESSAGES.userConflict = "User already exists";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      // console.log(" Username or Password are null");
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }

    const existUser = await getUser(username);
    if (existUser) {
      return res.status(409).json({
        message: RESPONSE_MESSAGES.userConflict,
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await createUser(username, hashedPassword);
    // check query error
    if (newUser.error) {
      return res.status(500).json({ message: RESPONSE_MESSAGES.databaseError });
    }

    return res.status(201).json({
      message: RESPONSE_MESSAGES.taskSuccess,
    });
  } catch (error) {
    console.error("Error on registerController ->", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.taskError,
    });
  }
};

module.exports = { register };
