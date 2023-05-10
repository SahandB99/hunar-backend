import { Router } from "express";
import { addArt, getArtById, getArts } from "../controllers/arts.controller.js";
import {
  resizeImage,
  resizeImages,
  uploadMulti,
  uploadSingle,
} from "../middlewares/multer.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(protect, addArt).get(getArts);

router.route("/upload").post(uploadSingle, resizeImage, (req, res) => {
  res.json({ path: `arts/${req.file.filename}` });
});

router.route("/upload-multi").post(uploadMulti, resizeImages, (req, res) => {
  res.json({ paths: req.body.files });
});

router.route("/:id").get(getArtById);

export default router;
