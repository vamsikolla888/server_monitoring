import { stopAllWatchers } from "./file.events"


/**
 * @description - Closing database connections, clearing cache, or cleaning up resources before exiting.
 */
async function graceShutdown() {
  await stopAllWatchers();
  logger.warn("Application shutdown.....")
}


process.on("SIGINT", graceShutdown);
process.on("SIGTERM", graceShutdown);

