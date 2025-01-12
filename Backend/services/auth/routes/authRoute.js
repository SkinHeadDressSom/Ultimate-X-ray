const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const registerController = require("../controllers/register");
const auth = require("../middleware/auth");
const pool = require("../database/postgres-config");

router.post("/login", loginController.login);
router.post("/register", registerController.register);

module.exports = router;
