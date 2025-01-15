const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: RESPONSE_MESSAGES.taskSuccess });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: RESPONSE_MESSAGES.taskError });
  }
};

module.exports = { logout };
