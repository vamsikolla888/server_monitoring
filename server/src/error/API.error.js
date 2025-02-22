import httpStatusCodes from "http-status-codes";
class CustomError extends Error {
  constructor(message, statusCode){
    super(message);
    this.message = message;
    this.statusCode = statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR;

  }
}


class APIError extends CustomError {
  constructor(message, statusCode){
    super(message, statusCode);
  }
}

export default APIError;