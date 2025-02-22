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
      message: err.message,
      code: err.statusCode
    });
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid JSON payload',
      code: 400
    });
  }

  if (err instanceof ZodError) {

    return res.json({ errorCode: 9001, errorMessage: formatZodError(err)});
  }

  // Default error
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    code: 500
  });
}
