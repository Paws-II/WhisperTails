import express from "express";
import ownerBlogController from "../../controllers/owner/ownerBlog.js";
import {
  authenticateJWT,
  authorizeRole,
} from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/multer.js";

const router = express.Router();

router.use(authenticateJWT, authorizeRole("owner"));

router.get("/", ownerBlogController.getBlog);

router.post("/", upload.single("image"), ownerBlogController.createBlog);

router.put("/", upload.single("image"), ownerBlogController.updateBlog);

export default router;
