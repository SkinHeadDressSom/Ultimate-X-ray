// app.js
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fetchRoute = require("./routes/fetchRoute");
const pool = require("./database/postgres-config");
const cors = require("cors");
dotenv.config();

const app = express();

const port = process.env.PORT || 3002;

// Test database connection on app startup
pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
// Routes
app.use("/api", fetchRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
