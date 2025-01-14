const express = require("express");
const dotenv = require("dotenv");
const testRoute = require("./routes/testRoute");

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

// Mount routes
app.use("/api", testRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
