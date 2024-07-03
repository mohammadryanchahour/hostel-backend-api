const unauthenticatedUrls = {
  login: "/login",
  register: "/register",
};

const responseMessages = {
  INTERNAL_SERVER_ERROR:
    "This is an Internal Server Error. We are working on resolving this issue, please try again later.",
  LOGIN_SUCCESS: "User logged in successfully!",
  LOGIN_FAILED: "Invalid credentials. Please try again.",
  REGISTRATION_SUCCESS:
    "User registered successfully! Please check your email for verification.",
  REGISTRATION_FAILED: "Registration failed. Please try again.",
  INVALID_EMAIL: "Email is incorrect",
  INVALID_PASSWORD: "Password is incorrect.",
  TOKEN_REFRESHED: "Access Token Refreshed Successfully",
  TOKEN_NOT_FOUND: "Access Token not Found, authorization denied!",
  TOKEN_EXPIRED: "Token has expired. Please log in again.",
  TOKEN_INVALID: "Token is invalid, authorization denied!",
  ROLE_NOT_FOUND: "Role not found.",
  PERMISSION_NOT_FOUND: "Permission not found.",
  USER_NOT_FOUND: "User not found.",
  DUPLICATE_USER: "User already exists",
  PASSWORD_MISMATCH: "Passwords do not match.",
  PASSWORD_STRENGTH_WEAK: "Password is too weak.",
  PASSWORD_STRENGTH_MEDIUM: "Password is medium strength.",
  PERMISSION_REQUIRED:
    "Unauthorized. User doesnot have the required permission.",
  EMAIL_VERIFICATION_SUCCESS: "Verification Email sent successfully.",
  EMAIL_VERIFICATION_FAILED: "Failed to send verification email.",
  EMAIL_VERIFICATION_OTP_INVALID: "Invalid OTP.",
  EMAIL_VERIFICATION_OTP_EXPIRED: "OTP has expired.",
  EMAIL_VERIFICATION_REQUIRED: "Email verification required.",
  EMAIL_VERIFIED_SUCCESS: "Email Verified Successfully.",
};

module.exports = {
  responseMessages,
  unauthenticatedUrls,
};
