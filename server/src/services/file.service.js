import path from "path";
import fs, { promises } from "fs";
import mime from "mime-types";

/**@Models */
import File from "../models/configDocumentLibraryWindowsServer.model";
import ConfigWindowsFileServer from "../models/configWindowsFileServer.model";

/**@Utils */
import serviceUtil from "../utils/service.util";
import { fileProcessingQueue } from "../jobs/file.job";

/**@Events */
import { initializeWatcher, stopWatcher } from "../events/file.events";
import elasticService from "./elastic.service";
import { WINDOWS_FILE_SERVER_DEV } from "../config/elastic.config";


/**
 * 
 * @param { import("express").Request } req
 * @param { import("express").Response } res 
 * @param { import("express").NextFunction }
 */
async function load(req, res, next){
  req.file = await File.get(req.params.fileId);
  next();
}

/**
 * 
 * @param { import("express").Request } req 
 * @param { import("express").Response } res 
 * @returns 
 */
async function get(req, res){
  if(!req.file) return res.json({ errorMessage: "File not found."});
  if(req.file && req.file?.type === "file" && fs.existsSync(req.file.path))
  {


    // Dynamically get the MIME type
    const mimeType = mime.lookup(req.file.path) || 'application/octet-stream'; 

    // Set headers for proper content type, you can dynamically set this based on the file type
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename=${req.file.name}`);

    const fileStream = fs.createReadStream(req.file.path);
    fileStream.pipe(res);

  }
  return { details: req.file };
}

/**
 * 
 * @param { import("express").Request } req 
 * @param { import("express").Response } res 
 * @returns 
 */
async function listFiles(req){
  const query = await serviceUtil.generateListQuery(req, "Files");
  if(Object.keys(query.filter).length <= 1) query.filter.isRoot = true;
  const files = await File.list(query);
  query.pagination.totalCount = await File.totalCount(query);
  return { files, pagination: query.pagination }
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
async function syncAll(req, res) {
  let findConfigDocuments = await ConfigWindowsFileServer.find({ active: true });
  await Promise.all(findConfigDocuments.map(async document => removeIfBaseFolderIsExists(document.baseFolder)));
  findConfigDocuments.forEach(document => fileProcessingQueue.push({ baseFolder: document.baseFolder }));
  res.status(200);
  return { respCode: 200, respMessage: "Documents synced successfully"};
}


/**
 * @param {import("express").Request} req 
 */
async function readDirectoryRecursive(req){
  console.log("READ DIR", path.resolve(req.baseFolder));
  const servePath = path.join(req.baseFolder);

  if (!fs.existsSync(servePath)) return { errorCode: 404, errorMessage: "Base folder not exists" };

  /**@If Exists remove the existing files and try new one's */
  await removeIfBaseFolderIsExists(req.baseFolder);


  try {

    const rootDiskName = getDiskName(servePath);
    const rootFileCount = await getFileCount(servePath);

    // Create root record with the actual folder name
    const rootRecord = new File({ 
      path: servePath, 
      name: path.basename(servePath) || 'root',
      isRoot: true, 
      type: 'dir',
      size: serviceUtil.formatSize(await getFolderSize(servePath)),
      relativePath: '/',
      diskName: rootDiskName,
      noOfFiles: rootFileCount
    });
    await File.saveDocument(rootRecord);

    const dirRecords = new Map();
    dirRecords.set(servePath, rootRecord);

    const files = await promises.readdir(servePath, { withFileTypes: true, recursive: true });
    
    for (const file of files) {
      const fullPath = path.join(file.path, file.name);
      const immediateParentPath = path.dirname(fullPath);
      const relativePath = path.join('/', path.relative(servePath, fullPath));

      const newRecord = new File({
        path: fullPath,
        name: file.name,
        type: file.isDirectory() ? 'dir' : 'file',
        parentId: dirRecords.get(immediateParentPath)?._id || rootRecord._id,
        isRoot: false,
        size: serviceUtil.formatSize(await getFolderSize(fullPath)),
        relativePath: relativePath.replace(/\\/g, '/'),
        diskName: getDiskName(fullPath),
        noOfFiles: file.isDirectory() ? await getFileCount(fullPath) : 0
      });
      
      await File.saveDocument(newRecord);
      
      if (file.isDirectory()) {
        dirRecords.set(fullPath, newRecord);
      }
    }

    logger.info("Directory scan completed successfully", {
      path: servePath,
      totalFiles: rootFileCount
    });

    /**@Add to chokidar watch list */
    initializeWatcher(req.baseFolder);

    return { success: true, baseFolder: servePath };
  } catch (error) {
    logger.error("Error in readDir:", error);
    return { errorCode: 500, error: error.message };
  }
}


// async function readDirectoryRecursive(req){
//   console.log("READ DIR", path.resolve(req.baseFolder));
//   const servePath = path.join(req.baseFolder);

//   if (!fs.existsSync(servePath)) return { errorCode: 404, errorMessage: "Base folder not exists" };

//   /**@If Exists remove the existing files and try new one's */
//   await removeIfBaseFolderIsExists(req.baseFolder);


//   try {

//     const rootDiskName = getDiskName(servePath);
//     const rootFileCount = await getFileCount(servePath);

//     // Create root record with the actual folder name
//     const rootRecord = new File({ 
//       path: servePath, 
//       name: path.basename(servePath) || 'root',
//       isRoot: true, 
//       type: 'dir',
//       size: serviceUtil.formatSize(await getFolderSize(servePath)),
//       relativePath: '/',
//       diskName: rootDiskName,
//       noOfFiles: rootFileCount
//     });
//     await File.saveDocument(rootRecord);

//     const dirRecords = new Map();
//     dirRecords.set(servePath, rootRecord);

//     const files = fs.readdirSync(servePath, { withFileTypes: true, recursive: true });
    
//     for (const file of files) {
//       const fullPath = path.join(file.path, file.name);
//       const immediateParentPath = path.dirname(fullPath);
//       const relativePath = path.join('/', path.relative(servePath, fullPath));

//       const newRecord = new File({
//         path: fullPath,
//         name: file.name,
//         type: file.isDirectory() ? 'dir' : 'file',
//         parentId: dirRecords.get(immediateParentPath)?._id || rootRecord._id,
//         isRoot: false,
//         size: serviceUtil.formatSize(await getFolderSize(fullPath)),
//         relativePath: relativePath.replace(/\\/g, '/'),
//         diskName: getDiskName(fullPath),
//         noOfFiles: file.isDirectory() ? await getFileCount(fullPath) : 0
//       });
      
//       await File.saveDocument(newRecord);
      
//       if (file.isDirectory()) {
//         dirRecords.set(fullPath, newRecord);
//       }
//     }

//     logger.info("Directory scan completed successfully", {
//       path: servePath,
//       totalFiles: rootFileCount
//     });

//     /**@Add to chokidar watch list */
//     initializeWatcher(req.baseFolder);

//     return { success: true };
//   } catch (error) {
//     logger.error("Error in readDir:", error);
//     return { errorCode: 500, error: error.message };
//   }
// }


/**@PrivateFunction (only use inside of this file) */

/**
 * 
 * @param {String} folderPath 
 * @returns { Number} size
 */

async function getFolderSize(folderPath) {
  let totalSize = 0;
  try {
    // const stats = fs.statSync(folderPath);
    const stats = await promises.stat(folderPath);
    if (stats.isDirectory()) {
      // If it's a directory, recurse into its contents
      const items = await promises.readdir(folderPath, { withFileTypes: true });
  
      for (const item of items) {
        const itemPath = path.join(folderPath, item.name);
        if (item.isDirectory()) {
          totalSize += await getFolderSize(itemPath); // Recursively get folder size
        } else if (item.isFile()) {
          const fileStats = await promises.stat(itemPath); // Get the size of the file
          totalSize += fileStats.size;
        }
      }
    } else if (stats.isFile()) {
      // If it's a file, get its size directly
      totalSize = stats.size;
    }
  
    return totalSize;
  }
  catch(err) {
    logger.error(`Error occurred while access this path ${folderPath}`);
    return totalSize;
  }
}

// async function getFolderSize(folderPath) {
//   let totalSize = 0;
//   try {
//     const stats = fs.statSync(folderPath);
//     if (stats.isDirectory()) {
//       // If it's a directory, recurse into its contents
//       const items = fs.readdirSync(folderPath, { withFileTypes: true });
  
//       for (const item of items) {
//         const itemPath = path.join(folderPath, item.name);
//         if (item.isDirectory()) {
//           totalSize += await getFolderSize(itemPath); // Recursively get folder size
//         } else if (item.isFile()) {
//           const fileStats = fs.statSync(itemPath); // Get the size of the file
//           totalSize += fileStats.size;
//         }
//       }
//     } else if (stats.isFile()) {
//       // If it's a file, get its size directly
//       totalSize = stats.size;
//     }
  
//     return totalSize;
//   }
//   catch(err) {
//     logger.error(`Error occurred while access this path ${folderPath}`);
//     return totalSize;
//   }
// }


/**
 * Get number of files in a directory
 * @param {String} dirPath Directory path
 * @returns {Number} Count of files
 */
async function getFileCount(dirPath) {
  try {
    let fileCount = 0;

    if (!fs.existsSync(dirPath)) {
      return fileCount;
    }

    const items = await promises.readdir(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      
      if (item.isDirectory()) {
        // Recursively count files in subdirectories
        fileCount += await getFileCount(fullPath);
      } else if (item.isFile()) {
        fileCount++;
      }
    }

    return fileCount;
  } catch (error) {
    logger.error(`Error counting files in ${dirPath}:`, error);
    return 0;
  }
}

// async function getFileCount(dirPath) {
//   try {
//     let fileCount = 0;

//     if (!fs.existsSync(dirPath)) {
//       return fileCount;
//     }

//     const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
//     for (const item of items) {
//       const fullPath = path.join(dirPath, item.name);
      
//       if (item.isDirectory()) {
//         // Recursively count files in subdirectories
//         fileCount += await getFileCount(fullPath);
//       } else if (item.isFile()) {
//         fileCount++;
//       }
//     }

//     return fileCount;
//   } catch (error) {
//     logger.error(`Error counting files in ${dirPath}:`, error);
//     return 0;
//   }
// }

/**
 * 
 * @param {String} pathStr 
 * @returns 
 */
const getDiskName = (pathStr) => {
  if (process.platform === 'win32') {
    const match = pathStr.match(/^([A-Za-z]:)/);
    return match ? match[0] : '';
  }
  return '';
};

/**
 * 
 * @param {String} baseFolderPath 
 * @returns 
 */
async function removeIfBaseFolderIsExists(baseFolderPath) {
  const escapedBaseFolderPath = baseFolderPath.replace(/\\/g, '\\\\');
  // const pathRegex = new RegExp(`^${escapedBaseFolderPath}`);
  const pathRegex = new RegExp(`^${escapedBaseFolderPath}(\\\\|/|$)`);
  const existingFolder = await File.findOne({ path: pathRegex, isRoot: true });
  if(existingFolder) {
    logger.info("Found existing folder & removing it...")
    let findDocumentIds = (await File.find({ path: pathRegex }, { _id: 1 })).map(doc => ({ delete: { _index: WINDOWS_FILE_SERVER_DEV, _id: doc._id }}));
    const count = await File.deleteMany({ path: pathRegex });
    stopWatcher(baseFolderPath);
    logger.info(`Successfully removed ${count} files...`)

    /**@Deleting From Elastic Search as well. */
    const deleteCount = await elasticService.deleteExistingDocument(findDocumentIds);
    logger.info(`Successfully removed ${deleteCount} documents from Elastic Search...`)
  }
  return;
}




export default { load, get, listFiles, readDirectoryRecursive, syncAll, getFolderSize, getFileCount, getDiskName, removeIfBaseFolderIsExists };


