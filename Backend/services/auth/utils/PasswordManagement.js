const bcrypt = require("bcryptjs");
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt); //return hashed password
}

async function verifyPassword(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword); //return true or false
}

module.exports = { hashPassword, verifyPassword };
