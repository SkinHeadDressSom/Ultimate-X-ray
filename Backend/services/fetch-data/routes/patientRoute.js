const express = require("express");
const router = express.Router();
const fetchPatientController = require("../controllers/fetchPatient");

const { validateToken } = require("../middleware/auth");

router.get(
  "/fetch-patient",
  validateToken,
  fetchPatientController.fetchPatient
);

module.exports = router;
