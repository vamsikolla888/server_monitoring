import async from "async";
import File from "../models/configDocumentLibraryWindowsServer.model";

/**@Services */
import elasticService from "../services/elastic.service";

export const addToElasticSearchQueue = async.queue(async task => {
  try{
    if(task?.documents?.length === 0) {
      logger.error("No documents to add to elastic search")
      return;
    }
    await elasticService.bulkInsertDocuments(task.documents);
    logger.info(`Documents added to ElasticSearch: ${task.documents.length}`);
  }
  catch(error) {
    logger.error(`Error adding document to ElasticSearch:`, error);
    return;
  
  }
})


addToElasticSearchQueue.drain(() => {
  logger.info("Add to Elastic Search Queue has been drained");
});



export const batchToElasticQueue = async.queue(async task => {
  try {
    if(!task.baseFolder) {
      logger.error("Base folder path is required");
      return;
    }
    const escapedBaseFolderPath = task.baseFolder.replace(/\\/g, '\\\\');
    // const pathRegex = new RegExp(`^${escapedBaseFolderPath}`);
    const pathRegex = new RegExp(`^${escapedBaseFolderPath}(\\\\|/|$)`);
    const totalCount = await File.find({ active: true, path: pathRegex }).countDocuments();
    if(totalCount < 1000) {
      let findDocuments = await File.find({ active: true, path: pathRegex }).lean();
      addToElasticSearchQueue.push({ documents: findDocuments, totalCount: totalCount });
    }
    else {
      for(let chunk = 0; chunk < Math.abs(totalCount / 1000); chunk++) {
        let findDocuments = await File.find({ active: true, path: pathRegex }).skip(chunk * 1000).limit(1000).lean();
        addToElasticSearchQueue.push({ documents: findDocuments });
      }
    }
  }
  catch(error) {
    logger.error(`Error occurred while processing batch:`, err);
    return;
  }
})

batchToElasticQueue.drain(() => {
  logger.info("Batch to Elastic Search Queue has been drained");
});


