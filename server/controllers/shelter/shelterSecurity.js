import bcrypt from "bcryptjs";
import ShelterLogin from "../../models/loginSystem/ShelterLogin.js";
import ShelterProfile from "../../models/profiles/ShelterProfile.js";
import Notification from "../../models/notifications/Notification.js";
import {
  generateAndStoreOTP,
  verifyOTP,
  sendPasswordChangeOTP,
} from "../../services/otp.service.js";

const shelterSecurityController = {
  requestPasswordChangeOTP: async (req, res) => {
    try {
      const shelterLogin = await ShelterLogin.findById(req.userId);

      if (!shelterLogin) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const { plainOTP, hashedOTP, otpExpiresAt } = await generateAndStoreOTP();

      shelterLogin.securityOTP = hashedOTP;
      shelterLogin.securityOTPExpiresAt = otpExpiresAt;
      await shelterLogin.save();

      const profile = await ShelterProfile.findOne({ shelterId: req.userId });

      await sendPasswordChangeOTP(
        shelterLogin.email,
        profile?.name || "Shelter",
        plainOTP
      );

      return res.json({
        success: true,
        message: "OTP sent to your email",
      });
    } catch (error) {
      console.error("Request OTP error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP",
      });
    }
  },

  verifyPasswordChangeOTP: async (req, res) => {
    try {
      const { otp } = req.body;

      if (!otp) {
        return res.status(400).json({
          success: false,
          message: "OTP is required",
        });
      }

      const shelterLogin = await ShelterLogin.findById(req.userId);

      if (!shelterLogin) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (
        !shelterLogin.securityOTP ||
        !shelterLogin.securityOTPExpiresAt ||
        shelterLogin.securityOTPExpiresAt < new Date()
      ) {
        return res.status(400).json({
          success: false,
          message: "OTP expired or not requested",
        });
      }

      const isValid = await verifyOTP(otp, shelterLogin.securityOTP);

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      return res.json({
        success: true,
        message: "OTP verified successfully",
      });
    } catch (error) {
      console.error("Verify OTP error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to verify OTP",
      });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { otp, newPassword, confirmPassword } = req.body;

      if (!otp || !newPassword || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
        });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
      }

      const shelterLogin = await ShelterLogin.findById(req.userId);

      if (!shelterLogin) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (
        !shelterLogin.securityOTP ||
        !shelterLogin.securityOTPExpiresAt ||
        shelterLogin.securityOTPExpiresAt < new Date()
      ) {
        return res.status(400).json({
          success: false,
          message: "OTP expired or not verified",
        });
      }

      const isValid = await verifyOTP(otp, shelterLogin.securityOTP);

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      shelterLogin.password = hashedPassword;
      shelterLogin.tempPassword = null;
      shelterLogin.passwordChanged = true;
      shelterLogin.securityOTP = null;
      shelterLogin.securityOTPExpiresAt = null;
      await shelterLogin.save();

      // Create notification
      const notification = new Notification({
        userId: req.userId,
        userModel: "ShelterLogin",
        type: "security",
        title: "Password Changed",
        message: "Your shelter account password has been changed successfully",
      });
      await notification.save();

      // Emit socket notification
      if (global.io) {
        global.io.to(`user:${req.userId}`).emit("notification:new", {
          notification,
          timestamp: Date.now(),
        });

        global.io.to(`user:${req.userId}`).emit("password:changed", {
          message:
            "Your shelter account password has been changed successfully",
          timestamp: Date.now(),
        });
      }

      return res.json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Change password error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to change password",
      });
    }
  },
};

export default shelterSecurityController;
