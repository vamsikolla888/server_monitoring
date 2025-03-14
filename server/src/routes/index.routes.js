import { Router } from "express";
import healthRoutes from "./health.routes";
import fileRoutes from "./file.routes";
import configWindowsFileServerRoutes from "./configWindowsFileServer.routes";
import elasticRoutes from "./elastic.routes";
import pm2Routes from "./pm2.routes";

const router = Router();

router
  .use(healthRoutes)
  .use(fileRoutes)
  .use(configWindowsFileServerRoutes)
  .use(elasticRoutes)
  .use(pm2Routes)

export default router;