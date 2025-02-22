import { Router } from "express";
import healthRoutes from "./health.routes";
import fileRoutes from "./file.routes";
import configWindowsFileServerRoutes from "./configWindowsFileServer.routes";
import elasticRoutes from "./elastic.routes";

const router = Router();

router
  .use(healthRoutes)
  .use(fileRoutes)
  .use(configWindowsFileServerRoutes)
  .use(elasticRoutes)

export default router;