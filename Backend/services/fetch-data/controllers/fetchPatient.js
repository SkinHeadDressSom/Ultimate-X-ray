const { getPatient } = require("../database/patientQuery");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");

const fetchPatient = async (req, res) => {
  RESPONSE_MESSAGES.taskError = "An error occurred at fetch patient";
  RESPONSE_MESSAGES.taskSuccess = "Fetch patient successfully";
  RESPONSE_MESSAGES.missingArguments = "Patient ID is missing";
  try {
    const { patient_id } = req.body;
    // Check if the patient_id are null
    if (!patient_id) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }

    const patient = await getPatientbyID(patient_id);
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
        message: RESPONSE_MESSAGES.invalidCredentials,
      });
    }

    // calculate age from date of birth
    age = CalculateAge(patient.date_of_birth);
    if (patient.age?.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.taskError,
        error: error.message,
      });
    }
    // Handle CalculateAge error
    if (age === null) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.taskError,
        error: "Failed to calculate age",
      });
    }
    patient.age = age;
    // Fetch patient succesfully
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

const CalculateAge = (dobString) => {
  try {
    const dob = new Date(dobString); // date of birth
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const month_diff = today.getMonth() - dob.getMonth();
    const day_diff = today.getDate() - dob.getDate();

    // Check if the day and month has passed yet
    if (month_diff < 0 || (month_diff === 0 && day_diff < 0)) {
      age--;
    }

    return age;
  } catch (error) {
    console.error("Error at Calculate Age function:", error.message);
    return null;
  }
};

module.exports = { fetchPatient };
