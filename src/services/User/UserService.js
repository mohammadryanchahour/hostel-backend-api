const User = require("../../models/User");
const { hashPassword } = require("../../helpers/AuthHelper");
const RoleService = require("../Access/RoleService");

class UserService {
  static async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  static async getUserById(id) {
    return await User.findById(id);
  }

  static async createUser({ email, password }) {
    const hashedPassword = await hashPassword(password);
    const role = await RoleService.getRoleByName("admin");
    const newUser = new User({
      email,
      password: hashedPassword,
      role_id: role.id,
    });
    return await newUser.save();
  }
}

module.exports = UserService;
