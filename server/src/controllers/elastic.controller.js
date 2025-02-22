import elasticService from "../services/elastic.service";
async function searchFiles (req, res, next) {
  logger.info("Elastic controller search files: " + JSON.stringify(req.query));
  const response = await elasticService.searchFiles(req.query);
  return res.json(response);
}

export default { searchFiles };