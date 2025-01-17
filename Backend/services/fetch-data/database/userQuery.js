const pool = require("./postgres-config");

// get user
async function getUser(username) {
  try {
    const query = "SELECT * FROM doctor WHERE username = $1";
    const result = await pool.query(query, [username]);

    // check if query is empty
    return result.rows.length === 0
      ? null
      : {
          id: result.rows[0].id,
          username: result.rows[0].username,
          password: result.rows[0].password,
        };
  } catch (error) {
    console.error("Database error in getUser:", error.message);
    // return an error object
    return {
      error: true,
      message: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

// get user by ID
async function getUserbyID(id) {
  try {
    const query = "SELECT * FROM doctor WHERE id = $1";
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
      error: true,
      message: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

async function createUser(username, password) {
  try {
    const query =
      "INSERT INTO doctor (username, password, role) VALUES ($1, $2, 'medical_staff') RETURNING *";
    const result = await pool.query(query, [username, password]);
    return result.rows.length === 0
      ? null
      : {
          id: result.rows[0].id,
          username: result.rows[0].username,
        };
  } catch (error) {
    console.error("Database error in createUser:", error.message);
    // return an error object
    return {
      error: true,
      message: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

module.exports = { getUser, getUserbyID, createUser };
