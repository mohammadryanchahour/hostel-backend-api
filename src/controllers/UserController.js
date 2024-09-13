const { SuccessResponse, ErrorResponse } = require("../helpers/ResponseHelper");
const { CustomError } = require("../services/Exception/ExceptionService");
const { responseMessages } = require("../helpers/StaticHelper");
const UserService = require("../services/User/UserService");

const inviteUser = async (req, res) => {
  try {
    const { email, userType, role } = req.body;
    const response = await UserService.invite(email, userType, role);

    return SuccessResponse(res, 200, responseMessages.INVITE_SUCCESS, response);
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      console.log(error.message);
      return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
    }
  }
};

const setupAccount = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;
    const response = await UserService.setup(token, password, confirmPassword);

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

module.exports = {
  inviteUser,
  setupAccount,
};
