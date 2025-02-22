import async from "async";
import File from "../models/configDocumentLibraryWindowsServer.model"

/**@Services */
import fileService from "../services/file.service";
import elasticService from "../services/elastic.service";
import { batchToElasticQueue } from "./elastic.job";

export const fileProcessingQueue = async.queue(async (task) => {
  try {
    logger.info(`Starting file processing for base folder: ${task.baseFolder}`);
    if (!task.baseFolder) {
      throw new Error('Base folder path is required');
    }

    const result = await fileService.readDirectoryRecursive({ baseFolder: task.baseFolder });

    if (!result.success) {
      throw new Error(`Failed to process directory: ${result.error || 'Unknown error'}`);
    }
    logger.info(`Successfully processed files from ${task.baseFolder}`);

    batchToElasticQueue.push({ baseFolder: task.baseFolder })
    return result;
  } catch (error) {
    logger.error(`File processing error:, ${JSON.stringify({ baseFolder: task.baseFolder, error: error.message, stack: error.stack })}`);
    throw error;
  }
}, 1);

// Add error handler for the queue
fileProcessingQueue.error((error, task) => {
  logger.error(`Queue error occurred:, ${JSON.stringify({ task: task, error: error.message, stack: error.stack })}`);
});


fileProcessingQueue.drain(async () => {
  logger.info('File processing queue has been drained');
  // const files = await File.find({ active: true }).limit(1000).lean();
  // await elasticService.bulkInsertDocuments(files);
})