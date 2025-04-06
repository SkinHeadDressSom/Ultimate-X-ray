// app.js
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const lusca = require("lusca");
const authRoute = require("./routes/authRoute");
const pool = require("./database/postgres-config");
const cors = require("cors");
dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// CSRF Protection
app.use(lusca.csrf());

// Routes
app.use("/api", authRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
