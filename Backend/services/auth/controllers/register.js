const { hashPassword } = require("../utils/PasswordManagement");
const pool = require("../database/postgres-config");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        message: "Username and password are required",
      });
    }

    const existUser = await getUser(username);
    if (existUser) {
      return res.status(409).send({
        message: "User already exists",
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await createUser(username, hashedPassword);

    res.status(201).send({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error on registerController ->", error.message);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

async function createUser(username, password) {
  try {
    const query =
      "INSERT INTO doctor (username, password) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(query, [username, password]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Database error in createUser:", error.message);
    throw error;
  }
}

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

module.exports = { register };
