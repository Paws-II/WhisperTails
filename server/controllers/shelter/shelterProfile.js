import ShelterProfile from "../../models/profiles/ShelterProfile.js";
import Notification from "../../models/notifications/Notification.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../../services/cloudinary.service.js";

const shelterProfileController = {
  getProfile: async (req, res) => {
    try {
      const shelterProfile = await ShelterProfile.findOne({
        shelterId: req.userId,
      }).populate("shelterId", "email role mode");

      if (!shelterProfile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found",
        });
      }

      return res.json({
        success: true,
        profile: shelterProfile,
      });
    } catch (error) {
      console.error("Get shelter profile error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch profile",
      });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const {
        name,
        phone,
        address,
        bio,
        specialization,
        experience,
        capacity,
      } = req.body;

      const shelterProfile = await ShelterProfile.findOne({
        shelterId: req.userId,
      });

      if (!shelterProfile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found",
        });
      }

      if (name !== undefined) shelterProfile.name = name;
      if (phone !== undefined) shelterProfile.phone = phone;
      if (address !== undefined) shelterProfile.address = address;
      if (bio !== undefined) shelterProfile.bio = bio;
      if (specialization !== undefined)
        shelterProfile.specialization = specialization;
      if (experience !== undefined) shelterProfile.experience = experience;
      if (capacity !== undefined) shelterProfile.capacity = capacity;

      shelterProfile.profileCompleted = true;
      await shelterProfile.save();

      const profileNotification = new Notification({
        userId: req.userId,
        userModel: "ShelterLogin",
        type: "profile",
        title: "Profile Updated",
        message: "Your shelter profile has been updated successfully",
        metadata: {
          updatedFields: Object.keys(req.body),
        },
      });

      await profileNotification.save();

      if (global.io) {
        global.io.to(`user:${req.userId}`).emit("notification:new", {
          notification: profileNotification,
          timestamp: Date.now(),
        });

        global.io.to(`user:${req.userId}`).emit("profile:updated", {
          profile: shelterProfile,
          timestamp: Date.now(),
        });
      }

      return res.json({
        success: true,
        message: "Profile updated successfully",
        profile: shelterProfile,
      });
    } catch (error) {
      console.error("Update shelter profile error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to update profile",
      });
    }
  },

  updateAvatar: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const shelterProfile = await ShelterProfile.findOne({
        shelterId: req.userId,
      });

      if (!shelterProfile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found",
        });
      }

      if (
        shelterProfile.avatar &&
        shelterProfile.avatar !== "url" &&
        shelterProfile.avatar.includes("cloudinary")
      ) {
        const publicId = shelterProfile.avatar.split("/").pop().split(".")[0];

        await deleteFromCloudinary(`avatars/${publicId}`);
      }

      const uploadResult = await uploadToCloudinary(req.file.buffer, "avatars");

      shelterProfile.avatar = uploadResult.secure_url;
      await shelterProfile.save();

      const avatarNotification = new Notification({
        userId: req.userId,
        userModel: "ShelterLogin",
        type: "avatar",
        title: "Profile Picture Updated",
        message: "Your shelter profile picture has been updated successfully",
        metadata: {
          avatarUrl: uploadResult.secure_url,
        },
      });

      await avatarNotification.save();

      if (global.io) {
        global.io.to(`user:${req.userId}`).emit("notification:new", {
          notification: avatarNotification,
          timestamp: Date.now(),
        });

        global.io.to(`user:${req.userId}`).emit("avatar:updated", {
          avatar: uploadResult.secure_url,
          timestamp: Date.now(),
        });
      }

      return res.json({
        success: true,
        message: "Avatar updated successfully",
        avatar: uploadResult.secure_url,
      });
    } catch (error) {
      console.error("Update shelter avatar error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to update avatar",
      });
    }
  },

  updateCapacity: async (req, res) => {
    try {
      const { capacity } = req.body;

      if (capacity === undefined || capacity < 0) {
        return res.status(400).json({
          success: false,
          message: "Valid capacity is required",
        });
      }

      const shelterProfile = await ShelterProfile.findOne({
        shelterId: req.userId,
      });

      if (!shelterProfile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found",
        });
      }

      const previousCapacity = shelterProfile.capacity;
      shelterProfile.capacity = capacity;
      await shelterProfile.save();

      const capacityNotification = new Notification({
        userId: req.userId,
        userModel: "ShelterLogin",
        type: "profile",
        title: "Capacity Updated",
        message: `Shelter capacity updated from ${previousCapacity} to ${capacity}`,
        metadata: {
          oldCapacity: previousCapacity,
          newCapacity: capacity,
        },
      });

      await capacityNotification.save();

      if (global.io) {
        global.io.to(`user:${req.userId}`).emit("notification:new", {
          notification: capacityNotification,
          timestamp: Date.now(),
        });

        global.io.to(`user:${req.userId}`).emit("capacity:updated", {
          capacity,
          timestamp: Date.now(),
        });
      }

      return res.json({
        success: true,
        message: "Capacity updated successfully",
        capacity,
      });
    } catch (error) {
      console.error("Update shelter capacity error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to update capacity",
      });
    }
  },
};

export default shelterProfileController;
