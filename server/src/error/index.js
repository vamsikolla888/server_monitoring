import { ZodError } from "zod";
import httpStatusCodes from "http-status-codes";
import APIError from "./API.error";
import { formatZodError } from "./zod.error";

export default function (err, req, res, next) {
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: 'error',
      errorMessage: err.message,
      errorCode: err.statusCode
    });
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      errorMessage: 'Invalid JSON payload',
      errorCode: 400
    });
  }

  if (err instanceof ZodError) {

    return res.json({ errorCode: 9001, errorMessage: formatZodError(err)});
  }

  // Default error
  return res.status(500).json({
    status: 'error',
    errorMessage: 'Internal server error',
    errorCode: 500
  });
}
