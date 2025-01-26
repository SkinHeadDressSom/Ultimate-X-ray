const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");

const logout = async (req, res) => {
  RESPONSE_MESSAGES.taskError = "An error occurred at logout";
  RESPONSE_MESSAGES.taskSuccess = "Logout successfully";

  try {
    console.log(RESPONSE_MESSAGES.taskSuccess);
    res.clearCookie("token");
    return res.status(200).json({ message: RESPONSE_MESSAGES.taskSuccess });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: RESPONSE_MESSAGES.taskError, error: error.message });
  }
};

module.exports = { logout };
