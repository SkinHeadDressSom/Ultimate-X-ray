const { getCasebyHN } = require("../database/caseQuery");
const { getImageCount } = require("../database/imageQuery");
const { SplitDateandTime } = require("../utils/SplitDateandTime");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");

const fetchCases = async (req, res) => {
  RESPONSE_MESSAGES.taskError = "An error occurred at fetch case";
  RESPONSE_MESSAGES.taskSuccess = "Fetch case(s) successfully";
  RESPONSE_MESSAGES.missingArguments = "HN is missing";
  RESPONSE_MESSAGES.notFound = "case not found";
  RESPONSE_MESSAGES.invalidOrder = "Invalid order. Use 'asc' or 'desc'";
  RESPONSE_MESSAGES.invalidStatus =
    "Invalid order. Use 'Scheduled' or 'Completed'.";
  RESPONSE_MESSAGES.invalidPageNumber =
    "Invalid page number. Should be number type";
  try {
    const { hn } = req.params;
    const { order = "desc", status = null, page = 1 } = req.query;

    // Check if the hn are null
    if (!hn) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }

    // Validate order
    if (!["asc", "desc"].includes(order.toLowerCase())) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.invalidOrder,
      });
    }
    // Validate status
    if (status != null) {
      if (!["Scheduled", "Completed"].includes(status.toString())) {
        return res
          .status(400)
          .json({ message: RESPONSE_MESSAGES.invalidStatus });
      }
    }

    // Validate page number
    const pageNumber = parseInt(page, 10);
    // NaN = Not-a-Number
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res
        .status(400)
        .json({ message: RESPONSE_MESSAGES.invalidPageNumber });
    }

    const cases = await getCasebyHN(
      hn,
      order.toLowerCase(),
      status,
      pageNumber
    );

    // Handling query error
    if (cases?.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
        error: cases.error,
      });
    }

    // Check if the user exists in database
    if (!cases) {
      return res.status(404).json({
        message: RESPONSE_MESSAGES.notFound,
      });
    }

    const enriched_cases = await Promise.all(
      cases.patient_cases.map(async (caseItem) => {
        // query image
        const image = await getImageCount(caseItem.an);

        // Handling query error
        if (image?.error) {
          return res.status(500).json({
            message: RESPONSE_MESSAGES.databaseError,
            error: image.error,
          });
        }

        // Split study_date -> study_date and time
        const study_date_time = new Date(caseItem.study_date);
        const { date, time } = await SplitDateandTime(study_date_time);

        // Handle split data and time error
        if (date === null || time === null) {
          throw new Error("Failed to split data and time");
        }

        // Since using Promise.all , we need return each loop
        return {
          ...caseItem,
          image_count: image.count,
          study_date: date,
          time: time,
        };
      })
    );

    // Fetch case succesfully
    return res.status(200).json({
      message: RESPONSE_MESSAGES.taskSuccess,
      data: { hn: cases.hn, patient_cases: enriched_cases },
    });
  } catch (error) {
    console.error("Error in fetch case controller ->", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.taskError,
      error: error.message,
    });
  }
};

module.exports = { fetchCases };
