const { SuccessResponse, ErrorResponse } = require("../helpers/ResponseHelper");
const { CustomError } = require("../services/Exception/ExceptionService");
const AuthService = require("../services/Auth/AuthService");

const register = async (req, res) => {
  try {
    const response = await AuthService.register(req.body);

    return SuccessResponse(res, 201, "User registered successfully", response);
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      console.log("ERROR => ", error);
      return ErrorResponse(
        res,
        500,
        "This is an Internal Server Error. We are working on resolving this issue, please try again later."
      );
    }
  }
};

const login = async (req, res) => {
  try {
    const response = await AuthService.login(req.body);

    return SuccessResponse(res, 200, "User Logged In Successfully!", response);
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      console.log("ERROR => ", error);
      return ErrorResponse(
        res,
        500,
        "This is an Internal Server Error. We are working on resolving this issue, please try again later."
      );
    }
  }
};

const refresh = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return ErrorResponse(
        res,
        (statusCode = 401),
        (message = "No token, authorization denied!")
      );
    }

    const response = AuthService.refresh(token);

    return SuccessResponse(
      res,
      200,
      "Access Token Refreshed Successfully!",
      response
    );
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      console.log("ERROR => ", error);
      return ErrorResponse(
        res,
        500,
        "This is an Internal Server Error. We are working on resolving this issue, please try again later."
      );
    }
  }
};

module.exports = {
  register,
  login,
  refresh,
};
