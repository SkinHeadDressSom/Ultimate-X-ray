const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const logoutController = require("../controllers/logout");
const registerController = require("../controllers/register");
const { validateToken } = require("../middleware/auth");

router.post("/login", validateToken, loginController.login);
router.post("/register", registerController.register);
router.post("/logout", logoutController.logout);

module.exports = router;
