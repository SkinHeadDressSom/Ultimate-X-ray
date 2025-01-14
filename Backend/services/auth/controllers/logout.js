const RESPONSE_MESSAGES = {
  cookieNotFound: "Cookie not found",
  logoutSuccess: "Logout Success",
  logoutError: "An error occurred during logout",
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: RESPONSE_MESSAGES.logoutSuccess });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: RESPONSE_MESSAGES.logoutError });
  }
};

module.exports = { logout };
