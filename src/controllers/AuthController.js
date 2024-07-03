const { SuccessResponse, ErrorResponse } = require("../helpers/ResponseHelper");
const { CustomError } = require("../services/Exception/ExceptionService");
const { responseMessages } = require("../helpers/StaticHelper");
const AuthService = require("../services/Auth/AuthService");

const register = async (req, res) => {
  try {
    const response = await AuthService.register(req.body);

    return SuccessResponse(
      res,
      201,
      responseMessages.REGISTRATION_SUCCESS,
      response
    );
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
    }
  }
};

const login = async (req, res) => {
  try {
    const response = await AuthService.login(req.body);

    return SuccessResponse(res, 200, responseMessages.LOGIN_SUCCESS, response);
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
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
        (message = responseMessages.TOKEN_NOT_FOUND)
      );
    }

    const response = AuthService.refresh(token);

    return SuccessResponse(
      res,
      200,
      responseMessages.TOKEN_REFRESHED,
      response
    );
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      console.log("ERROR => ", error);
      return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
    }
  }
};

const verify = async (req, res) => {
  try {
    const response = await AuthService.verifyEmail(req.body);
    return SuccessResponse(
      res,
      200,
      responseMessages.EMAIL_VERIFIED_SUCCESS,
      response
    );
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
    }
  }
};

module.exports = {
  register,
  login,
  refresh,
  verify,
};
