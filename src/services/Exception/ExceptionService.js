class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class UserAlreadyExistsError extends CustomError {
  constructor() {
    super(400, "User already exists");
  }
}

class PasswordMismatchError extends CustomError {
  constructor() {
    super(400, "Passwords do not match");
  }
}

class UserNotFoundError extends CustomError {
  constructor() {
    super(400, "User not found");
  }
}

class InvalidPasswordError extends CustomError {
  constructor() {
    super(400, "Invalid password");
  }
}

class InvalidTokenError extends CustomError {
  constructor() {
    super(401, "Token is invalid, authorization denied!");
  }
}

module.exports = {
  CustomError,
  UserAlreadyExistsError,
  PasswordMismatchError,
  UserNotFoundError,
  InvalidPasswordError,
  InvalidTokenError,
};
