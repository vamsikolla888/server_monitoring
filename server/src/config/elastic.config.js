import client from "../connections/elastic.connection"

export const WINDOWS_FILE_SERVER_DEV = "windows-fileserver-dev";
const indices = [
  {
    name: 'windows-fileserver-dev',
    body: {
      settings: {
        number_of_shards: 1,
        number_of_replicas: 1,
      },
      mappings: {
        properties: {
          name: { type: 'text' }, // Searchable field
          path: { type: 'text' }, // Searchable field
          type: { type: 'keyword' },
          relativePath: { type: 'keyword' },
          isRoot: { type: 'boolean' },
          size: { type: 'keyword' },
          noOfFiles: { type: 'integer' },
          diskName: { type: 'keyword' },
          active: { type: 'boolean' },
        },
      },
    },
  },
]


async function createIndices() {
  for(const index of indices) {
    const indexExists = await client.indices.exists({ index: index.name });
    if(!indexExists) {
      logger.info(`Creating a index ${index.name}`)
      await client.indices.create({ index: index.name, body: index.body });
    }
    else {
      logger.info(`Index ${index.name} already exists`)
    }
  }
}

export default { createIndices };