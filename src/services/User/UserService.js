const User = require("../../models/User");
const { hashPassword } = require("../../helpers/AuthHelper");

class UserService {
  static async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  static async getUserById(id) {
    return await User.findById(id);
  }

  static async createUser({ email, password }) {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    return await newUser.save();
  }
}

module.exports = UserService;
