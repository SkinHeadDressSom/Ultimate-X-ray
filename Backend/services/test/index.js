const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const testRoute = require("./routes/testRoute");

dotenv.config();
const PORT = process.env.PORT || 6000;

const app = express();
// Mount routes
app.use("/api", testRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
