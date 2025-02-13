const { getAnnotationImage } = require("../database/annotationQuery");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");
const { decodeToken } = require("../utils/CookiesManagement");

const fetchAnnotationImage = async (req, res) => {
  RESPONSE_MESSAGES.taskError = "XN error occurred at fetch annotation";
  RESPONSE_MESSAGES.taskSuccess = "Fetch annotation successfully";
  RESPONSE_MESSAGES.missingArguments = "XN is missing";
  RESPONSE_MESSAGES.notFound = "Annotation image not found";

  try {
    // get xn from params
    const { xn } = req.params;
    if (!xn) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }

    // get user_id from token [SKIP handle error since this process has done on middleware]
    const token = req.cookies.token;
    const decoded = await decodeToken(token);
    const user_id = decoded.user_id;

    const images = await getAnnotationImage(user_id, xn);
    // Handling query error
    if (images?.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
        error: cases.error,
      });
    }

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

module.exports = { fetchAnnotationImage };
