import { Router } from "express";
import configWindowsFileServerCtrl from "../controllers/configWindowsFileServer.controller";
import validations from "../validations";
import { schemaTypes } from "../validations/constants";

const router = Router();

router
  .route("/")
  .get(configWindowsFileServerCtrl.list)

router
  .route("/")
  .all(validations.validateSchema(validations.createConfigDocumentSchema, schemaTypes.BODY))
  .post(configWindowsFileServerCtrl.create)

router
  .route("/multiDelete")
  .all(validations.validateSchema(validations.multiDeleteSchema, schemaTypes.BODY))
  .post(configWindowsFileServerCtrl.multiDelete)

router
  .route("/:configDocumentId")
  .all(validations.validateSchema(validations.paramValidation, schemaTypes.PARAM))
  .all(validations.validateSchema(validations.updateConfigDocumentSchema, schemaTypes.BODY))
  .put(configWindowsFileServerCtrl.update)

router
  .route("/:configDocumentId")
  .all(validations.validateSchema(validations.paramValidation, schemaTypes.PARAM))
  .get(configWindowsFileServerCtrl.get)
  .delete(configWindowsFileServerCtrl._delete)

router.param("configDocumentId", configWindowsFileServerCtrl.load);




export default Router().use("/configWindowsFileServer", router);
