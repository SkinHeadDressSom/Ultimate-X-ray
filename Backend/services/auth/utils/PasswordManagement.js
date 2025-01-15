const bcrypt = require("bcryptjs");
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt); //return hashed password
  } catch (error) {
    console.error("Error in hashPassword:", error.message);
    // return error object
    return {
      error: true,
      message: error.message,
    };
  }
}

async function verifyPassword(password, hashPassword) {
  try {
    return await bcrypt.compare(password, hashPassword); //return true or false
  } catch (error) {
    console.error("Error in verifyPassword:", error.message);
    // return error object
    return {
      error: true,
      message: error.message,
    };
  }
}

module.exports = { hashPassword, verifyPassword };
