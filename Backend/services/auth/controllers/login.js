const { verifyPassword } = require("../utils/PasswordManagement");
const pool = require("../database/postgres-config");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetch the user from the database
    const user = await getUser(username);
    console.log("user", user);

    // Check if the user exists
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    console.log("Userfound");

    // Verify the password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid credentials",
      });
    }
    console.log("Password valid");

    res.status(200).send({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error in login controller ->", error.message);
    res.status(500).send({
      message: "An error occurred during login",
    });
  }
};

// Fetch the user from the database by username
async function getUser(username) {
  try {
    const query = "SELECT * FROM doctor WHERE username = $1";
    const result = await pool.query(query, [username]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

module.exports = { login };
