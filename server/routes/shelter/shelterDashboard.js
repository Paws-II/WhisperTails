import express from "express";
import shelterDashboardController from "../../controllers/shelter/shelterDashboard.js";
import {
  authenticateJWT,
  authorizeRole,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateJWT, authorizeRole("shelter"));

router.get("/", shelterDashboardController.getDashboardData);

router.get("/stats", shelterDashboardController.getStats);

export default router;
