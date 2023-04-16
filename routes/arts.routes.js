import { Router } from "express";
import { addArt, getArts } from "../controllers/arts.controller.js";

const router = Router();

router.route("/").post(addArt).get(getArts);

export default router;
