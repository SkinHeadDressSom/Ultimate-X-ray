const { getImagesbyAN } = require("../database/imageQuery");
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

    // Fetch case succesfully
    return res.status(200).json({
      message: RESPONSE_MESSAGES.taskSuccess,
      data: images,
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
