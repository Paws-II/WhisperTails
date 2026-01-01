import OwnerPet from "../../models/ownerPets/OwnerPet.js";
import Notification from "../../models/notifications/Notification.js";
import OwnerLogin from "../../models/loginSystem/OwnerLogin.js";

const shelterPetManagementController = {
  getAllOwnerPets: async (req, res) => {
    try {
      const { category, status } = req.query;

      const filter = { visibleToShelters: true };

      if (category) {
        filter.category = category.toUpperCase();
      }

      if (status) {
        filter.status = status;
      }

      const pets = await OwnerPet.find(filter).sort({ createdAt: -1 }).lean();

      return res.json({
        success: true,
        data: pets,
        total: pets.length,
      });
    } catch (error) {
      console.error("Get all owner pets error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch owner pets",
      });
    }
  },

  getPetDetails: async (req, res) => {
    try {
      const { petId } = req.params;

      const pet = await OwnerPet.findById(petId).lean();

      if (!pet) {
        return res.status(404).json({
          success: false,
          message: "Pet not found",
        });
      }

      return res.json({
        success: true,
        data: pet,
      });
    } catch (error) {
      console.error("Get pet details error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch pet details",
      });
    }
  },

  updatePetStatus: async (req, res) => {
    try {
      const { petId } = req.params;
      const { status } = req.body;
      const shelterId = req.userId;

      const validStatuses = ["active", "resolved", "archived"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status. Must be: active, resolved, or archived",
        });
      }

      const pet = await OwnerPet.findByIdAndUpdate(
        petId,
        { status },
        { new: true }
      );

      if (!pet) {
        return res.status(404).json({
          success: false,
          message: "Pet not found",
        });
      }

      const notification = await Notification.create({
        userId: pet.ownerId,
        userModel: "OwnerLogin",
        type: "general",
        title: "Pet Status Updated",
        message: `A shelter has updated the status of your ${pet.category.toLowerCase()} pet${
          pet.petName ? ` "${pet.petName}"` : ""
        } to: ${status}`,
        metadata: {
          petId: pet._id,
          category: pet.category,
          newStatus: status,
          shelterId,
        },
      });

      if (req.app.locals.io) {
        req.app.locals.io.to(`user:${pet.ownerId}`).emit("notification:new", {
          ...notification.toObject(),
          read: false,
          createdAt: new Date(),
        });
      }

      return res.json({
        success: true,
        message: "Pet status updated successfully",
        data: pet,
      });
    } catch (error) {
      console.error("Update pet status error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update pet status",
      });
    }
  },
};

export default shelterPetManagementController;
