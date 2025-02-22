const { parentPort, workerData } = require('worker_threads');
const fs = require('fs').promises;
const path = require('path');

async function processDirectory(dirPath) {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    let fileCount = 0;
    let size = 0;

    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      const stats = await fs.stat(fullPath);

      if (file.isDirectory()) {
        const subDirResults = await processDirectory(fullPath);
        fileCount += subDirResults.fileCount;
        size += subDirResults.size;
      } else {
        fileCount++;
        size += stats.size;
      }
    }

    return { fileCount, size };
  } catch (error) {
    throw error;
  }
}

// Handle messages from the main thread
parentPort.on('message', async (message) => {
  try {
    const { dirPath } = message;
    const result = await processDirectory(dirPath);
    parentPort.postMessage({ success: true, data: result });
  } catch (error) {
    parentPort.postMessage({ success: false, error: error.message });
  }
}); 