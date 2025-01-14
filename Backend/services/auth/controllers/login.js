const { verifyPassword } = require("../utils/PasswordManagement");
const { createToken } = require("../utils/CookiesManagement");
const { getUser } = require("../database/userQuery");

const RESPONSE_MESSAGES = {
  invalidCredentials: "Invalid Username or Password",
  loginSuccess: "Login successful",
  loginError: "An error occurred during login",
  databaseError: "Database error occurred",
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username or password are null
    if (!username || !password) {
      // console.log(" Username or Password are null");
      return res.status(400).json({
        message: RESPONSE_MESSAGES.invalidCredentials,
      });
    }

    const user = await getUser(username);
    // Check query error
    if (user.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
      });
    }
    // Check if the user exists
    if (!user) {
      // console.log(" User not found");
      return res.status(404).send({
        message: RESPONSE_MESSAGES.invalidCredentials,
      });
    }

    // Verify the password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      // console.log(" Password is invalid");
      return res.status(401).json({
        message: RESPONSE_MESSAGES.invalidCredentials,
      });
    }

    // Generate the payload and set the token cookie
    const token = await createToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    // Login succesfully
    // console.log("Login successfully");
    return res.status(200).json({
      message: RESPONSE_MESSAGES.loginSuccess,
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error in login controller ->", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.loginError,
    });
  }
};

module.exports = { login };
