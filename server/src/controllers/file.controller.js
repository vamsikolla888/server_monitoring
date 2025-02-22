import fileService from "../services/file.service";
import httpStatusCodes from "http-status-codes";



/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function load(req, res, next){
  logger.info(`File load fileId: ${JSON.stringify(req.params)}`)
  return fileService.load(req, res, next);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function get(req, res, next){
  logger.info(`File get fileId: ${req.params.fileId}`)
  return await fileService.get(req, res);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function list(req, res, next){
  logger.info(`File list controller -> Request Query, '${JSON.stringify(req.query)}', "Params: ", '${JSON.stringify(req.params)}'`);
  const result = await fileService.listFiles(req);
  return res.status(httpStatusCodes.OK).json(result);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function scanDirectoryRecursive(req, res, next){
  const response = await fileService.readDirectoryRecursive(req);
  return res.json({ response })
}

async function syncAll(req, res, next) {
  logger.info("File Controller -> Sync All");
  const response = await fileService.syncAll(req, res);
  return res.json({ response });
}

export default { load, get, list, scanDirectoryRecursive, syncAll };