import { Client } from "@elastic/elasticsearch";

/**@Config */
import config from "../config/config";

logger.info(`Elastic Url -> ${config.elasticUrl}`);
const client = new Client({ node: config.elasticUrl })

export async function checkConnection() {
  try {
    const response = await client.cluster.health();
    logger.info(`Elastic Connected -> ${JSON.stringify(response)}`);
    console.log('Elasticsearch is connected:', response.body);
    return response.status;
  } catch (error) {
    console.error('Error connecting to Elasticsearch:', error);
    logger.error('Error connecting to Elasticsearch:', JSON.stringify(error));
  }
}

export default client;