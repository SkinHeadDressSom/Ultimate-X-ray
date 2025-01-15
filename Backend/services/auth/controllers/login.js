const { verifyPassword } = require("../utils/PasswordManagement");
const { createToken } = require("../utils/CookiesManagement");
const { getUser } = require("../database/userQuery");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if the username or password are null
    if (!username || !password) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }

    const user = await getUser(username);
    // Check query error
    if (user.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
      });
    }

    // Check if the user exists in database
    if (!user) {
      return res.status(404).send({
        message: RESPONSE_MESSAGES.invalidCredentials,
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
    const token = await createToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
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
    });
  }
};

module.exports = { login };
