const User = require("../../models/User");
const { hashPassword } = require("../../helpers/AuthHelper");
const RoleService = require("../Access/RoleService");
const EmailService = require("../Email/EmailService");
const {
  EmailVerificationFailedError,
} = require("../Exception/ExceptionService");

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
    const user = await newUser.save();
    if (user) {
      const otp = await EmailService.generateOTP();
      const verificationEmailSent = EmailService.sendVerificationEmail(
        user.email,
        otp
      );
      if (!verificationEmailSent) {
        throw new EmailVerificationFailedError();
      } else {
        user.email_verification.otp = otp;
        user.email_verification.sent_at = new Date();
        return await user.save();
      }
    }
  }
}

module.exports = UserService;
