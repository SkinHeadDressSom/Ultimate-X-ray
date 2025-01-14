const { verifyPassword } = require("../utils/PasswordManagement");
const { createCookies } = require("../utils/CookiesManagement");
const { getUser } = require("../database/userQuery");

const RESPONSE_MESSAGES = {
  userNotFound: "User not found",
  invalidCredentials: "Invalid Username or Password",
  loginSuccess: "Login successful",
  loginError: "An error occurred during login",
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUser(username);

    // Check if the user exists
    if (!user) {
      return res.status(404).send({
        message: RESPONSE_MESSAGES.userNotFound,
      });
    }

    // Verify the password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: RESPONSE_MESSAGES.invalidCredentials,
      });
    }

    // Generate the payload and set the token cookie
    const token = await createCookies(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    // Login succesfully
    return res.status(200).json({
      message: RESPONSE_MESSAGES.loginSuccess,
      user: {
        id: user.id,
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
