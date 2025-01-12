const { Pool } = require("pg");

// PostgreSQL connection configuration
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Test the connection
(async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL successfully.");
    client.release();
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err);
  }
})();

module.exports = pool;
