const express = require("express");
const multer = require("multer");
const router = express.Router();
const fetchPatientController = require("../controllers/fetchPatient");
const fetchPatientbyNameController = require("../controllers/fetchPatientByName");
const fetchCasesController = require("../controllers/fetchCases");
const fetchImageController = require("../controllers/fetchImage");
const fetchAnnotationImageController = require("../controllers/fetchAnnotationImage");
const saveAnnotationImageController = require("../controllers/saveAnnotationImage");
const saveReportController = require("../controllers/saveReport");

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

// get annotation image by xn
router.get(
  "/images/annotation/:xn",
  validateToken,
  fetchAnnotationImageController.fetchAnnotationImage
);

const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory (Buffer)

// save annotation image by xn
router.post(
  "/images/annotation/:xn/save",
  validateToken,
  upload.single("image_file"),
  saveAnnotationImageController.saveAnnotationImage
);

// save report by an
router.patch(
  "/report/:an/save",
  validateToken,
  saveReportController.saveReport
);

module.exports = router;
