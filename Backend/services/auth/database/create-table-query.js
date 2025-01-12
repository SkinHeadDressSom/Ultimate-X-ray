const pool = require("./database/postgres-config");

async function createDoctorTable() {
  try {
    // Create a table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Table created successfully.");

    // Insert a new user
    username = "john_doe";
    password = hashPassword("securepassword");
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2, $3) RETURNING *",
      [username, password]
    );
    console.log("New user added:", result.rows[0]);
  } catch (err) {
    console.error("Error executing query:", err);
  } finally {
    pool.end(); // Close the connection pool
  }
}

module.exports = createDoctorTable;
