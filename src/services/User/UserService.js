const User = require("../../models/User");
const {
  hashPassword,
  generateToken,
  verifyToken,
} = require("../../helpers/AuthHelper");
const { responseMessages } = require("../../helpers/StaticHelper");
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

  static async invite(email, userType, role) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError(responseMessages.USER_ALREADY_EXISTS, 400);
    }

    const roleObject = await RoleService.getRoleByName(role);
    const role_id = roleObject.id;

    const token = generateToken({ email, role_id, userType }, "8h");
    return await EmailService.sendInviteEmail(email, token);
  }

  static async setup(token, password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new CustomError(responseMessages.PASSWORD_MISMATCH, 400);
    }

    const { email, role, userType } = verifyToken(token);
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      role,
      userType,
      password: hashedPassword,
      email_verification: {
        is_verified: true,
      },
    });

    return user;
  }
}

module.exports = UserService;
