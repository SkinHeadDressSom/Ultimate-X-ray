const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const logoutController = require("../controllers/logout");
const registerController = require("../controllers/register");
const { checkToken } = require("../middleware/auth");

router.post("/login", loginController.login);
router.post("/register", registerController.register);
router.post("/logout", checkToken, logoutController.logout);

router.get("/csrf-token", (req, res) => {
  console.log("Generated CSRF Token:", req.csrfToken());
  res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
