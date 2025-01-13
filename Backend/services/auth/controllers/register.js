const { hashPassword } = require("../utils/PasswordManagement");
const { getUser, createUser } = require("../database/userQuery");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const existUser = await getUser(username);
    if (existUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await createUser(username, hashedPassword);

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error on registerController ->", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { register };
