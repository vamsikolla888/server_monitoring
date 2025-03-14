/**@Services */
import configWindowsFileServerService from "../services/configWindowsFileServer.service";


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
async function load(req, res, next) {
  logger.info(`Config Windows File Server load configDocumentId: ${JSON.stringify(req.params)}`);
  return await configWindowsFileServerService.load(req, res, next);
}

/**
 * @GET
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
async function get(req, res, next) {
  logger.info(`Get Config Windows File Server configDocumentId: ${JSON.stringify(req.params)}`);
  const response = await configWindowsFileServerService.getConfigDocument(req);
  return res.json(response);
}

/**
 * @GET
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
async function list(req, res, next) {
  logger.info(`List Config Windows File Server -> Query: ${JSON.stringify(req.query)}`);
  const response = await configWindowsFileServerService.listConfigDocuments(req);
  return res.json(response);
}

/**
 * @POST
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
async function create(req, res, next) {
    logger.info(`Create Config Windows File Server -> BODY: ${JSON.stringify(req.body)}`);
    const response = await configWindowsFileServerService.createConfigDocument(req, res);
    return res.json(response);
}

/**
 * @PUT
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
async function update(req, res, next) {
  logger.info(`Update Config Windows File Server configDocumentId: ${JSON.stringify(req.params)} -> BODY: ${JSON.stringify(req.body)}`);
  const response = await configWindowsFileServerService.updateConfigDocument(req, res);
  return res.json(response);
}

/**
 * @DELETE
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
async function _delete(req, res, next) {
  logger.info(`Delete Config Windows File Server configDocumentId: ${JSON.stringify(req.params)}`);
  const response = await configWindowsFileServerService.deleteConfigDocument(req);
  return res.json(response);
}

/**
 * @POST
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
async function multiDelete(req, res, next) {
  logger.info(`Multi Delete Config Windows File Server configDocumentIds: ${JSON.stringify(req.body)}`);
  const response = await configWindowsFileServerService.multiDeleteConfigDocuments(req);
  return res.json(response);
}

export default { load, get, list, create, update, _delete, multiDelete };