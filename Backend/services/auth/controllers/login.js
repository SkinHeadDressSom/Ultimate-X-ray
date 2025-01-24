const { verifyPassword } = require("../utils/PasswordManagement");
const { createToken } = require("../utils/CookiesManagement");
const { getUser } = require("../database/userQuery");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");

const login = async (req, res) => {
  RESPONSE_MESSAGES.taskError = "An error occurred at login";
  RESPONSE_MESSAGES.taskSuccess = "Login successfully";
  try {
    const { username, password } = req.body;
    // Check if the username or password are null
    if (!username || !password) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }

    const user = await getUser(username);
    // Handling query error
    if (user?.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
        error: user.error,
      });
    }
    // Check if the user exists in database
    if (!user) {
      return res.status(404).json({
        message: RESPONSE_MESSAGES.invalidCredentials,
      });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    // Handling Failed to verify the password
    if (isPasswordValid.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.taskError,
        error: isPasswordValid.error,
      });
    }
    // Check if the password is matching
    if (!isPasswordValid) {
      return res.status(401).json({
        message: RESPONSE_MESSAGES.invalidCredentials,
      });
    }

    // Generate the payload and set the token cookie
    const token = await createToken(user.id);
    // Handling token creation error
    if (token.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.taskError,
        error: token.error,
      });
    }

    // Set the token cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    // Login succesfully
    return res.status(200).json({
      message: RESPONSE_MESSAGES.taskSuccess,
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error in login controller ->", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.taskError,
      error: error.message,
    });
  }
};

module.exports = { login };
