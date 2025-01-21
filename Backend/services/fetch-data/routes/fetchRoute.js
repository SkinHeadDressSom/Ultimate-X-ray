const express = require("express");
const router = express.Router();
const fetchPatientController = require("../controllers/fetchPatient");
const fetchCasesController = require("../controllers/fetchCases");

const { validateToken } = require("../middleware/auth");

// get patient by id
router.get(
  "/fetch-patient/:hn",
  validateToken,
  fetchPatientController.fetchPatient
);

router.get("/fetch-cases/:hn", validateToken, fetchCasesController.fetchCases);
module.exports = router;
