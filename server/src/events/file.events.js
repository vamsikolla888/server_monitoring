import chokidar from "chokidar";
import path from "path";
import fs from "fs";

/**@Models */
import File from "../models/configDocumentLibraryWindowsServer.model";

/**@Services */
import fileService from "../services/file.service";

/**@Utils */
import serviceUtil from "../utils/service.util";


// Store active watchers
const activeWatchers = new Map();

// Initialize watcher for a path
const initializeWatcher = (basePath) => {
  if (activeWatchers.has(basePath)) {
    logger.warn(`Watcher already exists for path: ${basePath}`);
    return;
  }

  const watcher = chokidar.watch(basePath, {
    persistent: true,
    ignoreInitial: true,
    ignored: /(^|[\/\\])\../
  });

  logger.info(`${basePath} added to chokidar watch list...`)

  // File added
  watcher.on("add", async (filepath) => {
    try {
      const stats = fs.statSync(filepath);
      const parentPath = path.dirname(filepath);
      const parentRecord = await File.findOne({ path: parentPath });

      let findRecord = await File.findOne({ path: path.basename(filepath), active: true });

      if(!findRecord) {
        const newFile = new File({
          name: path.basename(filepath),
          type: 'file',
          path: filepath,
          relativePath: '/' + path.relative(basePath, filepath).replace(/\\/g, '/'),
          isRoot: false,
          parentId: parentRecord?._id,
          size: serviceUtil.formatSize(stats.size),
          diskName: fileService.getDiskName(path.basename(filepath)), 
          size: serviceUtil.formatSize(await fileService.getFolderSize(path.basename(filepath)))
        });
  
        await newFile.save();
        logger.info(`File added: ${filepath}`);
      }
      else {
        logger.info(`File exists with this ${filepath}`);
      }

    } catch (error) {
      logger.error(`Error handling file addition: ${filepath}`, error);
    }
  });

  // Directory added
  watcher.on("addDir", async (dirpath) => {
    try {
      if (dirpath === basePath) return;

      const parentPath = path.dirname(dirpath);
      const parentRecord = await File.findOne({ path: parentPath });
      // const dirStats = await getDirectoryStats(dirpath);
      let findRecord = await File.findOne({ path: path.basename(dirpath), active: true });
      if(!findRecord) {
        const newDir = new File({
          name: path.basename(dirpath),
          type: 'dir',
          path: dirpath,
          relativePath: '/' + path.relative(basePath, dirpath).replace(/\\/g, '/'),
          isRoot: false,
          parentId: parentRecord?._id,
          size: serviceUtil.formatSize(await fileService.getFolderSize(path.basename(dirpath))),
          diskName: fileService.getDiskName(path.basename(dirpath)),
          active: true,
          noOfFiles: await fileService.getFileCount(path.basename(dirpath)),
        });
  
        await newDir.save();
  
        // Update parent directory counts
        if (parentRecord) {
          await File.updateOne(
            { _id: parentRecord._id },
            { 
              $set: { 
                noOfFiles: await fileService.getFileCount(parentRecord.path),
                size: serviceUtil.formatSize(await fileService.getFolderSize(parentRecord.path))
              }
            }
          );
        }
  
        logger.info(`Directory added: ${dirpath}`);
      }
      else{
        logger.info(`File exists with this path ${dirpath}`)
      }
    } catch (error) {
      logger.error(`Error handling directory addition: ${dirpath}`, error);
    }
  });

  // File removed
  watcher.on("unlink", async (filepath) => {
    try {
      await File.deleteOne({ path: filepath });
      logger.info(`File removed: ${filepath}`);
    } catch (error) {
      logger.error(`Error handling file deletion: ${filepath}`, error);
    }
  });

  // Directory removed
  watcher.on("unlinkDir", async (dirpath) => {
    try {
      const relativePath = '/' + path.relative(basePath, dirpath).replace(/\\/g, '/');
      await File.deleteMany({
        relativePath: new RegExp(`^${relativePath}($|/)`)
      });
      logger.info(`Directory and contents removed: ${dirpath}`);
    } catch (error) {
      logger.error(`Error handling directory deletion: ${dirpath}`, error);
    }
  });

  // // File changed
  // watcher.on("change", async (filepath) => {
  //   try {
  //     const stats = fs.statSync(filepath);
  //     await File.updateOne(
  //       { path: filepath },
  //       { 
  //         size: serviceUtil.formatSize(stats.size),
  //         active: true
  //       }
  //     );
  //     logger.info(`File updated: ${filepath}`);
  //   } catch (error) {
  //     logger.error(`Error handling file change: ${filepath}`, error);
  //   }
  // });

  // Handle errors
  watcher.on('error', (error) => {
    logger.error(`Watcher error for path ${basePath}:`, error);
  });

  activeWatchers.set(basePath, watcher);
  logger.info(`Watcher initialized for path: ${basePath}`);
};

// Stop watching a specific path
const stopWatcher = async (basePath) => {
  const watcher = activeWatchers.get(basePath);
  if (watcher) {
    await watcher.close();
    activeWatchers.delete(basePath);
    logger.info(`Watcher stopped for path: ${basePath}`);
  }
};

// Stop all watchers
const stopAllWatchers = async () => {
  for (const [path, watcher] of activeWatchers) {
    await watcher.close();
    logger.info(`Watcher stopped for path: ${path}`);
  }
  activeWatchers.clear();
};

export {
  initializeWatcher,
  stopWatcher,
  stopAllWatchers
}; 