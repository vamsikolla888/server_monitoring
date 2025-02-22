import path from "path";
import mongoose from "mongoose";

/**@Connections */
import client, { checkConnection } from "./connections/elastic.connection";

/**@Models */
import configWindowsFileServerModel from "./models/configWindowsFileServer.model";


/**@Events */
import { initializeWatcher } from "./events/file.events";
import elasticConfig from "./config/elastic.config";

/**@Config */
import config from "./config/config";



async function startUpProcesses() {

  /**@ElasticSearch */
  // const elasticConnection = await new Promise(resolve => checkConnection().then(result => resolve(result)));
  // if(!["green", "yellow"].includes(elasticConnection)) throw new Error("Elastic connection failed");
  // await elasticConfig.createIndices();

  /**@Mongoose */
  await new Promise(resolve => mongoose.connect(config.mongoUrl).then(connection => resolve(connection)));


  // /**@File Watcher */
  // const configurations = await configWindowsFileServerModel.find({ active: true }).lean();
  // await Promise.all(configurations.map(async config => await initializeWatcher(path.join(config.baseFolder))));
  return true;
}

export default startUpProcesses;