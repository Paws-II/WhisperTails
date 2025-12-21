import express from "express";
import applicationManagementController from "../../controllers/shelter/applicationManagement.js";
import {
  authenticateJWT,
  authorizeRole,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateJWT, authorizeRole("shelter"));

router.get("/", applicationManagementController.getShelterApplications);

router.get(
  "/:applicationId",
  applicationManagementController.getApplicationDetails
);

router.patch(
  "/:applicationId/review",
  applicationManagementController.moveToReview
);

router.patch(
  "/:applicationId/reject",
  applicationManagementController.rejectApplication
);

export default router;
