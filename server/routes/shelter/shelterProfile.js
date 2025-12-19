import express from "express";
import shelterProfileController from "../../controllers/shelter/shelterProfile.js";
import {
  authenticateJWT,
  authorizeRole,
} from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/multer.js";

const router = express.Router();

router.use(authenticateJWT, authorizeRole("shelter"));

router.get("/", shelterProfileController.getProfile);

router.put("/", shelterProfileController.updateProfile);

router.put(
  "/avatar",
  upload.single("avatar"),
  shelterProfileController.updateAvatar
);

router.put("/capacity", shelterProfileController.updateCapacity);

export default router;
