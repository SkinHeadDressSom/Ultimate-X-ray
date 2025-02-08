const { getImagesbyAN } = require("../database/imageQuery");
const { SplitDateandTime } = require("../utils/SplitDateandTime");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");

const fetchImage = async (req, res) => {
  RESPONSE_MESSAGES.taskError = "An error occurred at fetch image";
  RESPONSE_MESSAGES.taskSuccess = "Fetch image(s) successfully";
  RESPONSE_MESSAGES.missingArguments = "AN is missing";
  RESPONSE_MESSAGES.notFound = "image not found";

  try {
    const { an } = req.params;
    if (!an) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }

    const images = await getImagesbyAN(an);
    if (!images) {
      return res.status(404).json({
        message: RESPONSE_MESSAGES.notFound,
      });
    }

    const enriched_images = await Promise.all(
      images.case_images.map(async (imageItem) => {
        // Extract only date from date_of_birth
        const uploaded_date_time = new Date(imageItem.uploaded_date);
        const { date, time } = await SplitDateandTime(uploaded_date_time);

        // Handle split data and time error
        if (date === null) {
          throw new Error("Failed to split date and time");
        }
        // Handle split data and time error
        if (time === null) {
          throw new Error("Failed to split date and time");
        }

        // Since using Promise.all , we need return each loop
        return {
          ...imageItem,
          uploaded_date: date,
          uploaded_time: time,
        };
      })
    );

    // Fetch patient succesfully
    console.log("Patient Fetch", enriched_images);

    // Fetch case succesfully
    return res.status(200).json({
      message: RESPONSE_MESSAGES.taskSuccess,
      data: enriched_images,
    });
  } catch (error) {
    console.error("Error in fetch image controller ->", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.taskError,
      error: error.message,
    });
  }
};

module.exports = { fetchImage };
