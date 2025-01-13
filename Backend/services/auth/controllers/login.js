const { verifyPassword } = require("../utils/PasswordManagement");
const { createCookies } = require("../utils/CookiesManagement");
const { getUser } = require("../database/userQuery");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUser(username);

    // Check if the user exists
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // Verify the password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate the payload and set the token cookie
    const token = await createCookies(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    // Login succesfully
    console.log("Login successful");
    console.log("Token:", token);
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error in login controller ->", error.message);
    return res.status(500).json({
      message: "An error occurred during login",
    });
  }
};

module.exports = { login };
