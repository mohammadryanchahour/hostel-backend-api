const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../helpers/ResponseHelper");
const { responseMessages } = require("../helpers/StaticHelper");
const dotenv = require("dotenv");

dotenv.config();

const IsAuthenticated = (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return ErrorResponse(res, 401, "Authorization Header is required!");
    }
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return ErrorResponse(res, 401, responseMessages.TOKEN_NOT_FOUND);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
  }
};

module.exports = IsAuthenticated;
