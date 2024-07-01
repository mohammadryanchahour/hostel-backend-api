const jwt = require("jsonwebtoken");
const { SuccessResponse, ErrorResponse } = require("../helpers/responseHelper");
const UserService = require("../services/User/UserService");
const GlobalService = require("../services/Global/GlobalService");

const register = async (req, res) => {
  const { email, password, confirm_password } = req.body;

  try {
    const existingUser = await UserService.getUserByEmail(email);

    if (existingUser) {
      return ErrorResponse(res, 400, "User already exists");
    }

    if (password !== confirm_password) {
      return ErrorResponse(res, 400, "Passwords do not match");
    }

    const savedData = await UserService.createUser({ email, password });

    const responseData = {
      token: GlobalService.generateToken(savedData.id),
      user: savedData,
    };

    return SuccessResponse(
      res,
      201,
      "User Registered Successfully!",
      responseData
    );
  } catch (error) {
    console.error("Error while registering a user:", error);
    return ErrorResponse(
      res,
      500,
      "This is an Internal Server Error. We are working on resolving this issue, please try again later."
    );
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      return ErrorResponse(
        res,
        (statusCode = 400),
        (message = "User Not Found")
      );
    }

    const isMatch = GlobalService.comparePassword(password, user.password);

    if (!isMatch) {
      return ErrorResponse(
        res,
        (statusCode = 400),
        (message = "Invalid Password.")
      );
    }

    const responseData = {
      token: GlobalService.generateToken(user.id),
      user: user,
    };
    return SuccessResponse(
      res,
      200,
      "User Logged In Successfully!",
      responseData
    );
  } catch (error) {
    console.error("Error in user login:", error);
    return ErrorResponse(
      res,
      500,
      "This is an Internal Server Error. We are working on resolving this issue, please try again later."
    );
  }
};

const refresh = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return ErrorResponse(
      res,
      (statusCode = 401),
      (message = "No token, authorization denied!")
    );
  }

  try {
    const decoded = GlobalService.verifyToken(token);

    if (!decoded || decoded.id) {
      return ErrorResponse(
        res,
        (statusCode = 401),
        (message = "Token is not valid, authorization denied!")
      );
    }

    const responseData = {
      token: GlobalService.generateToken(decoded.id),
    };

    return SuccessResponse(
      res,
      200,
      "User Logged In Successfully!",
      responseData
    );
  } catch (error) {
    console.error("Error in token refresh:", error);
    return ErrorResponse(
      res,
      500,
      "This is an Internal Server Error. We are working on resolving this issue, please try again later."
    );
  }
};

module.exports = {
  register,
  login,
  refresh,
};
