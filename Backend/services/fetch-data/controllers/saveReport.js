const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");
const { updateRecordbyAN } = require("../database/caseQuery");

const saveReport = async (req, res) => {
  RESPONSE_MESSAGES.taskError = "An error occurred at save report";
  RESPONSE_MESSAGES.taskSuccess = "Save report successfully";
  RESPONSE_MESSAGES.missingArguments = "AN is missing";

  try {
    // get an
    const { an } = req.params;
    if (!an) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }

    // get body
    const { findings, impression, recommendations, action_comments } = req.body;

    const updated_record = updateRecordbyAN(
      an,
      findings,
      impression,
      recommendations,
      action_comments
    );
    // Handling query error
    if (updated_record.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
        error: newUser.error,
      });
    }
    return res.status(201).json({
      message: RESPONSE_MESSAGES.taskSuccess,
    });
  } catch (error) {
    console.error("Error in save report controller ->", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.taskError,
      error: error.message,
    });
  }
};

module.exports = { saveReport };
