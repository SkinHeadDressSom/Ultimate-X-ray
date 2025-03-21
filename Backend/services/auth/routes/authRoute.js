const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const logoutController = require("../controllers/logout");
const registerController = require("../controllers/register");
const { checkToken } = require("../middleware/auth");

router.post("/login", loginController.login);
router.post("/register", registerController.register);
router.post("/logout", checkToken, logoutController.logout);

module.exports = router;
