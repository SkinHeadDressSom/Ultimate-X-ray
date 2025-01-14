const { hashPassword } = require("../utils/PasswordManagement");
const { getUser, createUser } = require("../database/userQuery");

const RESPONSE_MESSAGES = {
  missingArguments: "Username and password are required",
  userConflict: "User already exists",
  registerSuccess: "User created successful",
  registerError: "An error occurred during register",
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
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

    res.status(201).json({
      message: RESPONSE_MESSAGES.registerSuccess,
      user: newUser,
    });
  } catch (error) {
    console.error("Error on registerController ->", error.message);
    res.status(500).json({
      message: RESPONSE_MESSAGES.registerError,
    });
  }
};

module.exports = { register };
