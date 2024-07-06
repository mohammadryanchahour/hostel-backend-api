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

class FailedToCreateRoleError extends CustomError {
  constructor() {
    super(404, responseMessages.ROLE_FAILED_TO_CREATE);
  }
}

class FailedToRetrieveRoleError extends CustomError {
  constructor() {
    super(404, responseMessages.ROLE_RETRIEVAL_FAILED);
  }
}

class PermissionNotFoundError extends CustomError {
  constructor() {
    super(404, responseMessages.PERMISSION_NOT_FOUND);
  }
}

class InvalidPermissionsError extends CustomError {
  constructor() {
    super(404, responseMessages.INVALID_PERMISSIONS);
  }
}

class InvalidOTPError extends CustomError {
  constructor() {
    super(400, responseMessages.EMAIL_VERIFICATION_OTP_INVALID);
  }
}

class EmailVerificationRequiredError extends CustomError {
  constructor() {
    super(400, responseMessages.EMAIL_VERIFICATION_REQUIRED);
  }
}

class EmailVerificationFailedError extends CustomError {
  constructor() {
    super(400, responseMessages.EMAIL_VERIFICATION_FAILED);
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
  FailedToCreateRoleError,
  FailedToRetrieveRoleError,
  PermissionNotFoundError,
  InvalidPermissionsError,
  InvalidOTPError,
  EmailVerificationRequiredError,
  EmailVerificationFailedError,
};
