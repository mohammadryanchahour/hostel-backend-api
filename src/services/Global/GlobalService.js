const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class GlobalService {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  static generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
  static async comparePassword(request_password, user_password) {
    return await bcrypt.compare(request_password, user_password);
  }
  static async verifyToken(token) {
    return await jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = GlobalService;
