const pool = require("./postgres-config");

// get user
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

// get user by ID
async function getUserbyID(id) {
  try {
    const query = "SELECT * FROM doctor WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

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

module.exports = { getUser, getUserbyID, createUser };
