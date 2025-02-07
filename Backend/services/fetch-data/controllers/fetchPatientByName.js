const { getPatientbyName } = require("../database/patientQuery");
const { CalculateAge } = require("../utils/CalculateAge");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");
const { SplitDateandTime } = require("../utils/SplitDateandTime");

const fetchPatientbyName = async (req, res) => {
  RESPONSE_MESSAGES.taskError = "An error occurred at fetch patient by name";
  RESPONSE_MESSAGES.taskSuccess = "Fetch patient successfully";
  RESPONSE_MESSAGES.missingArguments = "Patient name is missing";
  RESPONSE_MESSAGES.notFound = "Patient not found";
  try {
    const { name } = req.params;
    // Check if the hn are null
    if (!name) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }
    console.log("name:", name);

    const patients = await getPatientbyName(name);
    // Handling query error
    if (patients?.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
        error: patients.error,
      });
    }

    // Check if the user exists in database
    if (!patients) {
      return res.status(404).json({
        message: RESPONSE_MESSAGES.notFound,
      });
    }

    const enriched_patients = await Promise.all(
      patients.map(async (patientItem) => {
        // calculate age from date of birth
        age = await CalculateAge(patientItem.date_of_birth);
        // Handle CalculateAge error
        if (age === null) {
          return res.status(500).json({
            message: RESPONSE_MESSAGES.taskError,
            error: "Failed to calculate age",
          });
        }

        // Extract only date from date_of_birth
        const DOB_date_time = new Date(patientItem.date_of_birth);
        const { date, time } = await SplitDateandTime(DOB_date_time);

        // Handle split data and time error
        if (date === null) {
          throw new Error("Failed to split date and time");
        }

        // Since using Promise.all , we need return each loop
        return {
          ...patientItem,
          age: age,
          date_of_birth: date,
        };
      })
    );

    // Fetch patient succesfully
    console.log("Patient Fetch", enriched_patients);

    return res.status(200).json({
      message: RESPONSE_MESSAGES.taskSuccess,
      data: enriched_patients,
    });
  } catch (error) {
    console.error(
      "Error in fetch patient by name controller ->",
      error.message
    );
    return res.status(500).json({
      message: RESPONSE_MESSAGES.taskError,
      error: error.message,
    });
  }
};

module.exports = { fetchPatientbyName };
