import _ from "lodash";
import client from "../connections/elastic.connection";
import { WINDOWS_FILE_SERVER_DEV } from "../config/elastic.config";
import { query } from "express";

async function bulkInsertDocuments(documents = []) {
  if (documents.length === 0) {
    logger.error("No documents to insert...");
    return;
  }

  let documentsToBulkInsert = [];
  
  documents.forEach(doc => {
    if (!doc || !doc._id) {
      logger.warn("Skipping invalid document:", doc);
      return;
    }
    documentsToBulkInsert.push({
      index: {
        _index: WINDOWS_FILE_SERVER_DEV,
        _id: doc._id.toString(),
      }
    });
    documentsToBulkInsert.push(_.omit(doc, ["_id", "__v"]));
  });

  try {
    const response = await client.bulk({ refresh: true, body: documentsToBulkInsert });

    // Check for individual document errors
    if (response.errors) {
      response.items.forEach((item, index) => {
        if (item.index && item.index.error) {
          logger.error(`Error in document ${index}:`, item.index.error);
        }
      });
    }
    logger.info(`Successfully inserted ${documents.length} documents into Elasticsearch.`);
  } catch (error) {
    logger.error("Error while inserting documents into Elasticsearch:", error);
  }
}

async function deleteExistingDocument(documents) {
  const response = await client.bulk({ refresh: true, body: documents });
  if(response.errors){
    logger.error(`Error while deleting documents ${JSON.stringify(response.errors)}`);
    return;
  }
  let deletedCount = response.items.filter(item => item.delete.status === 200).length
  logger.info(`Successfully deleted ${deletedCount} documents from Elasticsearch.`);
  return deletedCount;
  // const pathRegex = `^${escapedBaseFolderPath}(?:\\\\|/|$)`;
  // const pathRegex = `^${escapedBaseFolderPath}\\\\?$`;
  // let query = {
  //   index: WINDOWS_FILE_SERVER_DEV,
  //   body: {
  //     query: {
  //         bool: {
  //             must: [
  //                 {
  //                     regexp: { 
  //                         path: pathRegex 
  //                     }
  //                 }
  //             ]
  //         }
  //     }
  //   }
  // }
  // logger.info(`ELASTIC DELETE QUERY ${JSON.stringify(query)}`);
  // const response = await client.deleteByQuery(query)
  // return response.deleted
}

async function searchFiles({ fileName }) {
  const response = await client.search({
    index: WINDOWS_FILE_SERVER_DEV,
    body: {
      query: {
        bool: {
          should: [
            { 
              query_string: { 
                query: `*${fileName}*`, 
                fields: ["name^2", "path"]
              } 
            }
          ],
          minimum_should_match: 1
        }
      }
    }
  })
  let result = response.hits.hits.map(data => {
    return { ...data._source, _id: data._id }
  })
  return { files: result }
}

export default { bulkInsertDocuments, deleteExistingDocument, searchFiles };
