const express = require("express");
const router = express.Router();
const fetchPatientController = require("../controllers/fetchPatient");
const fetchPatientbyNameController = require("../controllers/fetchPatientByName");
const fetchCasesController = require("../controllers/fetchCases");
const fetchImageController = require("../controllers/fetchImage");

const { validateToken } = require("../middleware/auth");

// get patient by hn
router.get(
  "/patients/by-hn/:hn",
  validateToken,
  fetchPatientController.fetchPatient
);

// get patient by patient's name
router.get(
  "/patients/by-name/:name",
  validateToken,
  fetchPatientbyNameController.fetchPatientbyName
);

// get list of cases by hn
router.get(
  "/patients/:hn/cases",
  validateToken,
  fetchCasesController.fetchCases
);

// get image cases by an
router.get("/images/:an", validateToken, fetchImageController.fetchImage);

module.exports = router;
