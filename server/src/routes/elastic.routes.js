import e, { Router } from "express";
import elasticController from "../controllers/elastic.controller";

const router = Router();


router
  .route("/search")
  .get(elasticController.searchFiles)


export default Router().use("/elastic", router);