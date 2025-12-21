import AdoptionApplication from "../../models/adoption/AdoptionApplication.js";
import PetProfile from "../../models/profiles/PetProfile.js";
import OwnerProfile from "../../models/profiles/OwnerProfile.js";
import Notification from "../../models/notifications/Notification.js";
import CheckPetStatus from "../../models/petStatus/CheckPetStatus.js";

const applicationManagementController = {
  getShelterApplications: async (req, res) => {
    try {
      console.log("req.userId (login id):", req.userId);
      const shelterId = req.userId;
      const { status, petId } = req.query;

      const query = {
        shelterId,
        isDeletedByOwner: false,
      };

      console.log("shelterProfile._id:", shelterId);

      if (status) query.status = status;
      if (petId) query.petId = petId;

      const applications = await AdoptionApplication.find(query)
        .populate(
          "petId",
          "name species breed images coverImage adoptionStatus"
        )
        .populate("ownerId", "email")
        .sort({ createdAt: -1 })
        .lean();

      const groupedByPet = applications.reduce((acc, app) => {
        const petIdStr = app.petId._id.toString();
        if (!acc[petIdStr]) {
          acc[petIdStr] = {
            pet: app.petId,
            applications: [],
          };
        }
        acc[petIdStr].applications.push(app);
        return acc;
      }, {});

      const result = Object.values(groupedByPet);

      return res.json({
        success: true,
        data: result,
        total: applications.length,
      });
    } catch (error) {
      console.error("Get applications error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch applications",
      });
    }
  },

  getApplicationDetails: async (req, res) => {
    try {
      const { applicationId } = req.params;
      const shelterId = req.userId;

      const application = await AdoptionApplication.findOne({
        _id: applicationId,
        shelterId,
        isDeletedByOwner: false,
      })
        .populate("petId")
        .populate("ownerId", "email")
        .lean();

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }

      const ownerProfile = await OwnerProfile.findOne({
        ownerId: application.ownerId._id,
      }).lean();

      return res.json({
        success: true,
        data: {
          application,
          ownerProfile,
        },
      });
    } catch (error) {
      console.error("Get application details error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch application details",
      });
    }
  },

  moveToReview: async (req, res) => {
    try {
      const { applicationId } = req.params;
      const shelterId = req.userId;

      const application = await AdoptionApplication.findOne({
        _id: applicationId,
        shelterId,
        status: "submitted",
      });

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found or already processed",
        });
      }

      application.status = "review";
      application.reviewedAt = new Date();
      await application.save();

      const pet = await PetProfile.findById(application.petId).lean();

      const ownerNotification = await Notification.create({
        userId: application.ownerId,
        userModel: "OwnerLogin",
        type: "general",
        title: "Application Under Review",
        message: `Your application for ${pet?.name} is now being reviewed by the shelter`,
        metadata: {
          applicationId: application._id,
          petId: application.petId,
          shelterId,
        },
      });

      if (req.app.locals.io) {
        req.app.locals.io
          .to(`user:${application.ownerId}`)
          .emit("notification:new", {
            _id: ownerNotification._id,
            title: ownerNotification.title,
            message: ownerNotification.message,
            type: "general",
            read: false,
            createdAt: ownerNotification.createdAt,
          });
      }

      return res.json({
        success: true,
        message: "Application moved to review",
        data: application,
      });
    } catch (error) {
      console.error("Move to review error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update application",
      });
    }
  },

  rejectApplication: async (req, res) => {
    try {
      const { applicationId } = req.params;
      const { rejectionReason } = req.body;
      const shelterId = req.userId;

      if (!rejectionReason || rejectionReason.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Rejection reason is required",
        });
      }

      const application = await AdoptionApplication.findOne({
        _id: applicationId,
        shelterId,
        status: { $in: ["submitted", "review"] },
      });

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found or already processed",
        });
      }

      const pet = await PetProfile.findById(application.petId).lean();

      application.status = "rejected";
      application.rejectionReason = rejectionReason;
      application.reviewedAt = new Date();
      await application.save();

      await CheckPetStatus.findOneAndUpdate(
        {
          petId: application.petId,
          applicationId: application._id,
        },
        {
          activeOwnerId: null,
          applicationId: null,
        }
      );

      // Send notification to owner
      const ownerNotification = await Notification.create({
        userId: application.ownerId,
        userModel: "OwnerLogin",
        type: "general",
        title: "Application Rejected",
        message: `Your adoption application for ${pet?.name} was not approved`,
        metadata: {
          applicationId: application._id,
          petId: application.petId,
          shelterId,
          rejectionReason,
        },
      });

      // Socket notification
      if (req.app.locals.io) {
        req.app.locals.io
          .to(`user:${application.ownerId}`)
          .emit("notification:new", {
            _id: ownerNotification._id,
            title: ownerNotification.title,
            message: ownerNotification.message,
            type: "general",
            read: false,
            createdAt: ownerNotification.createdAt,
            metadata: ownerNotification.metadata,
          });

        req.app.locals.io
          .to(`user:${application.ownerId}`)
          .emit("application:rejected", {
            applicationId: application._id,
            petId: application.petId,
            rejectionReason,
            timestamp: Date.now(),
          });
      }

      return res.json({
        success: true,
        message: "Application rejected successfully",
        data: application,
      });
    } catch (error) {
      console.error("Reject application error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to reject application",
      });
    }
  },
};

export default applicationManagementController;
