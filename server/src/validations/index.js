import * as defaultValidation from "./default.validation";
import * as fileValidations from "./file.validation";
import * as configDocumentSchemas from "./configWindowsFileServer.validation";
import { schemaTypes } from "./constants";
import APIError from "../error/API.error";
import { ZodError } from "zod";

/**
 * 
 * @param {import("zod").Schema} schema 
 * @param {String}
 */

const validateSchema = (schema, type) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(getInput(req, type));
      next();
    } catch (error) {
      logger.error(`Error occurred while validating schema`, error);
      next(error); 
    }
  };
};

/**@Private */

/**
 * 
 * @param {import("express").Request} req 
 */
const getInput = (req, type) => {
  if(schemaTypes.QUERY === type) return req.query;
  else if(schemaTypes.PARAM === type) return req.params;
  return req.body;
}




export default {
  ...defaultValidation,
  ...fileValidations,
  ...configDocumentSchemas,
  validateSchema
}