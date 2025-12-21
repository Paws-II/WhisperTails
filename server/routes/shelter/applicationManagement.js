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

router.post(
  "/:applicationId/chat",
  applicationManagementController.createChatConnection
);

router.post(
  "/:applicationId/meeting",
  applicationManagementController.createMeetingConnection
);
router.patch(
  "/:applicationId/chat/close",
  applicationManagementController.closeChatConnection
);

router.patch(
  "/:applicationId/meeting/close",
  applicationManagementController.closeMeetingConnection
);
router.get(
  "/:applicationId/chat/status",
  applicationManagementController.getChatRoomStatus
);

router.get(
  "/:applicationId/meeting/status",
  applicationManagementController.getMeetingRoomStatus
);
export default router;
