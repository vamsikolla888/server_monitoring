import { Router } from "express";

const router = Router();


router.get("/heartbeat", (req, res) => res.json({ heartbeat: true }));


export default Router().use("/health", router);