const UserService = require("../User/UserService");
const _ = require("lodash");

const {
  UserAlreadyExistsError,
  PasswordMismatchError,
  UserNotFoundError,
  InvalidPasswordError,
  InvalidTokenError,
  InvalidOTPError,
  EmailVerificationRequiredError,
  EmailVerificationFailedError,
} = require("../Exception/ExceptionService");
const {
  generateToken,
  comparePassword,
  verifyToken,
} = require("../../helpers/AuthHelper");

class AuthService {
  static async register(payload) {
    const { email, password, confirm_password } = payload;

    if (password !== confirm_password) {
      throw new PasswordMismatchError();
    }

    const existingUser = await UserService.getUserByEmail(email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const savedData = await UserService.createUser({ email, password });

    let keys = ["email", "user_type"];

    const response = {
      user: savedData,
    };
    response.user = _.pick(response.user, keys);

    return response;
  }

  static async login(payload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.email_verification.is_verified === false) {
      throw new EmailVerificationRequiredError();
    }

    const isMatch = comparePassword(password, user.password);

    if (!isMatch) {
      throw new InvalidPasswordError();
    }

    const response = {
      access_token: generateToken(user.id),
      user: user,
    };

    return response;
  }

  static async refresh(token) {
    const decoded = verifyToken(token);

    if (!decoded || decoded.id) {
      throw new InvalidTokenError();
    }

    const response = {
      refresh_token: generateToken(decoded.id),
    };

    return response;
  }

  static async verifyEmail(payload) {
    const { email, otp } = payload;
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.email_verification.otp === otp) {
      user.email_verification.is_verified = true;
      user.email_verification.otp = null;
      await user.save();
    } else {
      throw new InvalidOTPError();
    }

    const response = {
      access_token: generateToken(user.id),
      user: user,
    };

    return response;
  }
}

module.exports = AuthService;
