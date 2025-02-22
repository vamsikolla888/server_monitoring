import { Router } from "express";
import fileController from "../controllers/file.controller";

const router = Router();

router
  .route("/")
  .get(fileController.list);

router
  .route("/scan_directory")
  .get(fileController.scanDirectoryRecursive);

router
  .route("/sync_all")
  .get(fileController.syncAll)

router
  .route("/:fileId")
  .get(fileController.get);

router
  .param("fileId", fileController.load);




export default Router().use("/file", router);


