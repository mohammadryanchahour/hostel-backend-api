/**
 * Helper function to send a success response
 * @param {Object} res - The response object
 * @param {Number} statusCode - The HTTP status code
 * @param {String} message - The success message
 * @param {Object} data - The data to include in the response
 */
const SuccessResponse = (res, statusCode = 200, message = "", data = {}) => {
  res.status(statusCode).json({
    error: false,
    message,
    data,
  });
};

/**
 * Helper function to send an error response
 * @param {Object} res - The response object
 * @param {Number} statusCode - The HTTP status code
 * @param {String} message - The error message
 * @param {Object} data - The data to include in the response
 */
const ErrorResponse = (res, statusCode = 400, message = "") => {
  res.status(statusCode).json({
    error: true,
    message,
  });
};

module.exports = {
  SuccessResponse,
  ErrorResponse,
};
