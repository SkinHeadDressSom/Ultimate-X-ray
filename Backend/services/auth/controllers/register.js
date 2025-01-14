const { hashPassword } = require("../utils/PasswordManagement");
const { getUser, createUser } = require("../database/userQuery");

const RESPONSE_MESSAGES = {
  missingArguments: "Username and password are required",
  userConflict: "User already exists",
  registerSuccess: "User created successful",
  registerError: "An error occurred during register",
  databaseError: "Database error occurred",
};

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
      // console.log(" User is already exists");
      return res.status(409).json({
        message: RESPONSE_MESSAGES.userConflict,
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await createUser(username, hashedPassword);
    // check query error
    if (newUser.error) {
      //console.error("Error creating user:", newUser.message);
      return res.status(500).json({ message: RESPONSE_MESSAGES.databaseError });
    }

    // console.log(" User is created successfully");
    return res.status(201).json({
      message: RESPONSE_MESSAGES.registerSuccess,
    });
  } catch (error) {
    console.error("Error on registerController ->", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.registerError,
    });
  }
};

module.exports = { register };
