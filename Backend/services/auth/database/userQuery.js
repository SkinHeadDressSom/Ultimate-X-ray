const pool = require("./postgres-config");

// get user
async function getUser(username) {
  try {
    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await pool.query(query, [username]);

    // check if query is empty
    return result.rows.length === 0
      ? null
      : {
          id: result.rows[0].user_id,
          username: result.rows[0].username,
          password: result.rows[0].password_hash,
          name: result.rows[0].name,
          role: result.rows[0].role,
        };
  } catch (error) {
    console.error("Database error in getUser:", error.message);
    // return an error object
    return {
      error: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

// get user by ID
async function getUserbyID(id) {
  try {
    const query = `SELECT * FROM users WHERE user_id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows.length === 0
      ? null
      : {
          username: result.rows[0].username,
        };
  } catch (error) {
    console.error("Database error in getUserbyID:", error.message);
    // return an error object
    return {
      error: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

async function createUser(username, password) {
  try {
    const query = `INSERT INTO users (username, password_hash,role) VALUES ($1, $2, $3) RETURNING *`;
    const result = await pool.query(query, [
      username,
      password,
      "General Practitioner",
    ]);
    return result.rows.length === 0
      ? null
      : {
          id: result.rows[0].user_id,
          username: result.rows[0].username,
        };
  } catch (error) {
    console.error("Database error in createUser:", error.message);
    // return an error object
    return {
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

module.exports = { getUser, getUserbyID, createUser };
