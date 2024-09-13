const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
async function comparePassword(request_password, user_password) {
  return await bcrypt.compare(request_password, user_password);
}
async function verifyToken(token) {
  return await jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  hashPassword,
  generateToken,
  comparePassword,
  verifyToken,
};
