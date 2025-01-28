const express = require("express");
const router = express.Router();
const fetchPatientController = require("../controllers/fetchPatient");
const fetchPatientbyNameController = require("../controllers/fetchPatientByName");
const fetchCasesController = require("../controllers/fetchCases");

const { validateToken } = require("../middleware/auth");

// get patient by id
router.get(
  "/patients/by-hn/:hn",
  validateToken,
  fetchPatientController.fetchPatient
);
router.get(
  "/patients/by-name/:name",
  validateToken,
  fetchPatientbyNameController.fetchPatientbyName
);
router.get(
  "/patients/:hn/cases",
  validateToken,
  fetchCasesController.fetchCases
);

module.exports = router;
