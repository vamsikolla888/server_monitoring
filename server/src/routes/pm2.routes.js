import { Router } from "express";

/**@Controller */
import pm2Controller from "../controllers/pm2.controller";

const router = Router();

router
  .route("/")
  .get(pm2Controller.list)



export default Router().use("/pm2", router);