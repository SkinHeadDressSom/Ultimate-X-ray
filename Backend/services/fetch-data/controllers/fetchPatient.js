const { getPatientbyHN } = require("../database/patientQuery");
const { CalculateAge } = require("../utils/CalculateAge");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");
const { SplitDateandTime } = require("../utils/SplitDateandTime");

const fetchPatient = async (req, res) => {
  RESPONSE_MESSAGES.taskError = "An error occurred at fetch patient";
  RESPONSE_MESSAGES.taskSuccess = "Fetch patient successfully";
  RESPONSE_MESSAGES.missingArguments = "Patient ID is missing";
  RESPONSE_MESSAGES.notFound = "Patient not found";
  try {
    const { hn } = req.params;
    // Check if the hn are null
    if (!hn) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }

    const patient = await getPatientbyHN(hn);
    // Handling query error
    if (patient?.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
        error: patient.error,
      });
    }

    // Check if the user exists in database
    if (!patient) {
      return res.status(404).json({
        message: RESPONSE_MESSAGES.notFound,
      });
    }

    // calculate age from date of birth
    age = await CalculateAge(patient.date_of_birth);
    // Handle CalculateAge error
    if (age === null) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.taskError,
        error: "Failed to calculate age",
      });
    }
    patient.age = age;

    // Extract only date from date_of_birth
    const DOB_date_time = new Date(patient.date_of_birth);
    const { date, time } = await SplitDateandTime(DOB_date_time);

    // Handle split data and time error
    if (date === null) {
      throw new Error("Failed to split date and time");
    }

    patient.date_of_birth = date;

    // Fetch patient succesfully
    console.log("Patient Fetch", patient);

    return res.status(200).json({
      message: RESPONSE_MESSAGES.taskSuccess,
      data: patient,
    });
  } catch (error) {
    console.error("Error in fetch patient controller ->", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.taskError,
      error: error.message,
    });
  }
};

module.exports = { fetchPatient };
