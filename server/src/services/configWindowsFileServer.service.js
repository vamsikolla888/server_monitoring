import httpStatusCodes from "http-status-codes";
import fs, { promises } from "fs";
/**@Models */
import ConfigWindowsFileServer from "../models/configWindowsFileServer.model";
import { initializeWatcher, stopWatcher } from "../events/file.events";

/**@Services */
import serviceUtil from "../utils/service.util";

/**@Jobs */
import { fileProcessingQueue } from "../jobs/file.job";
import path from "path";
import fileService from "./file.service";


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function load(req, res, next) {
    req.configDocument = await File.get(req.params.configDocumentId);
    next();
}

/**
 * 
 * @param {import("express").Request} req 
 * @returns 
 */
async function getConfigDocument(req) {
  return { details: req.configDocument };
}

/**
 * 
 * @param { import("express").Request } req 
 */
async function listConfigDocuments(req){
  const query = await serviceUtil.generateListQuery(req, "ConfigWindowsFileServer");
  const configdocuments = await ConfigWindowsFileServer.list(query);
  query.pagination.totalCount = await ConfigWindowsFileServer.totalCount(query);
  return { configdocuments, pagination: query.pagination }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import("express").Response} res
 */
async function createConfigDocument(req, res) {
  let findConfigDocument = await ConfigWindowsFileServer.findOne({ baseFolder: req.body.baseFolder, active: true });
  if(findConfigDocument) {
    res.status(httpStatusCodes.FORBIDDEN)
    return { errorCode: 9001, errorMessage: "base folder is already exists!"}
  }
  const createNewConfigDocument = new ConfigWindowsFileServer(req.body);
  req.configDocument = await ConfigWindowsFileServer.saveDocument(createNewConfigDocument);
  fileProcessingQueue.push({ baseFolder: req.configDocument.baseFolder });
  res.status(201);
  return { _id: req.configDocument._id, respCode: 201, respMessage: "Config Windows File Server created successfully"};
}

/**
 * 
 * @param {import("express").Request} req 
 * @returns 
 */
async function updateConfigDocument(req) {
  const configDocument = req.configDocument;
  let findConfigDocument = await ConfigWindowsFileServer.findOne({ _id: { $ne: configDocument._id }, baseFolder: req.body.baseFolder, active: true });
  if(findConfigDocument) {
    res.status(httpStatusCodes.FORBIDDEN)
    return { errorCode: 9001, errorMessage: "base folder is already exists!"}
  }
  if(req.configDocument.baseFolder != path.join(req.body.baseFolder)) {
    await fileService.removeIfBaseFolderIsExists(req.configDocument.baseFolder);
  }
  let updatedConfigDocument = Object.assign(req.configDocument, req.body);
  req.configDocument = await ConfigWindowsFileServer.saveDocument(updatedConfigDocument);
  return { _id: req.configDocument._id, respCode: 200, respMessage: "Config Windows File Server updated successfully" };
}

/**
 * 
 * @param {import("express").Request} req 
 */
async function deleteConfigDocument(req) {
  req.configDocument = await ConfigWindowsFileServer.softRemoveDocument(req.params.configDocumentId);
  await fileService.removeIfBaseFolderIsExists(req.configDocument.baseFolder);
  return { _id: req.configDocument._id, respCode: 204, respMessage: "Config Windows File Server deleted successfully" };
}

/**
 * 
 * @param {import("express").Request} req 
 * @returns 
 */
async function multiDeleteConfigDocuments(req) {
  await ConfigWindowsFileServer.updateMany({ _id: { $in: req.body.selectedIds }}, { $set: { active: false }});

  /**@RemovingDocuments from mongo & elastic */
  let findConfigDocuments = await ConfigWindowsFileServer.find({ _id: { $in: req.body.selectedIds }});
  for(let i=0; i<findConfigDocuments.length; i++) {
    await fileService.removeIfBaseFolderIsExists(findConfigDocuments[i].baseFolder);
  }
  return { respCode: 204, respMessage: "Multiple Config Windows File Server deleted successfully" };
}


/**
 * 
 * @param {String} path 
 * @returns 
 */
async function checkDirectoryExists(path, ctx) {
  try {
    // console.log("PATH", path);
    // const stats = await promises.stat(path);
    // return stats.isDirectory();
    return fs.existsSync(path);
  } catch (error) {
    return false;
  }
}

export default { load, getConfigDocument, listConfigDocuments, createConfigDocument, updateConfigDocument, deleteConfigDocument, multiDeleteConfigDocuments, checkDirectoryExists }