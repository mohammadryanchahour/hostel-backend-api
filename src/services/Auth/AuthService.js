const UserService = require("../User/UserService");
const {
  UserAlreadyExistsError,
  PasswordMismatchError,
  UserNotFoundError,
  InvalidPasswordError,
  InvalidTokenError,
} = require("../Exception/ExceptionService");
const {
  generateToken,
  comparePassword,
  verifyToken,
} = require("../../helpers/AuthHelper");

class AuthService {
  static async register(payload) {
    const { email, password, confirm_password } = payload;
    const existingUser = await UserService.getUserByEmail(email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    if (password !== confirm_password) {
      throw new PasswordMismatchError();
    }

    const savedData = await UserService.createUser({ email, password });

    const response = {
      access_token: generateToken(savedData.id),
      user: savedData,
    };

    return response;
  }

  static async login(payload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
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
}

module.exports = AuthService;
