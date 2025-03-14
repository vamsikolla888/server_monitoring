/**@Services */
import pm2Service from "../services/pm2.service";
async function list (req, res, next) {
  logger.info(`GET: PM2 List controller....`);
  const response = await pm2Service.listProcesses(req, res);
  return res.json(response);
}

export default { list };