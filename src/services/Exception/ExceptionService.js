const { responseMessages } = require("../../helpers/StaticHelper");
class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class UserAlreadyExistsError extends CustomError {
  constructor() {
    super(400, responseMessages.DUPLICATE_USER);
  }
}

class PasswordMismatchError extends CustomError {
  constructor() {
    super(400, responseMessages.PASSWORD_MISMATCH);
  }
}

class UserNotFoundError extends CustomError {
  constructor() {
    super(400, responseMessages.USER_NOT_FOUND);
  }
}

class InvalidPasswordError extends CustomError {
  constructor() {
    super(400, responseMessages.INVALID_PASSWORD);
  }
}

class InvalidTokenError extends CustomError {
  constructor() {
    super(401, responseMessages.TOKEN_INVALID);
  }
}

class RoleNotFoundError extends CustomError {
  constructor() {
    super(404, responseMessages.ROLE_NOT_FOUND);
  }
}
class PermissionNotFoundError extends CustomError {
  constructor() {
    super(404, responseMessages.PERMISSION_NOT_FOUND);
  }
}

module.exports = {
  CustomError,
  UserAlreadyExistsError,
  PasswordMismatchError,
  UserNotFoundError,
  InvalidPasswordError,
  InvalidTokenError,
  RoleNotFoundError,
  PermissionNotFoundError,
};
