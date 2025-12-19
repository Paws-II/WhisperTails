import express from "express";
import shelterSecurityController from "../../controllers/shelter/shelterSecurity.js";
import {
  authenticateJWT,
  authorizeRole,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateJWT, authorizeRole("shelter"));

router.post("/request-otp", shelterSecurityController.requestPasswordChangeOTP);

router.post("/verify-otp", shelterSecurityController.verifyPasswordChangeOTP);

router.post("/change-password", shelterSecurityController.changePassword);

export default router;
