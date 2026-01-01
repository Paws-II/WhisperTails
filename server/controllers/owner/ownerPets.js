import OwnerPet from "../../models/ownerPets/OwnerPet.js";
import OwnerProfile from "../../models/profiles/OwnerProfile.js";
import Notification from "../../models/notifications/Notification.js";
import ShelterLogin from "../../models/loginSystem/ShelterLogin.js";
import { uploadToCloudinary } from "../../services/cloudinary.service.js";

const ownerPetsController = {
  addPet: async (req, res) => {
    try {
      const ownerId = req.userId;
      const { category, petData } = req.body;

      const parsedPetData =
        typeof petData === "string" ? JSON.parse(petData) : petData;

      const ownerProfile = await OwnerProfile.findOne({ ownerId }).lean();
      if (!ownerProfile) {
        return res.status(404).json({
          success: false,
          message: "Owner profile not found",
        });
      }

      const photos = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await uploadToCloudinary(file.buffer, "owner-pets");
          photos.push(result.secure_url);
        }
      }

      if (photos.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one photo is required",
        });
      }

      const petDoc = {
        ownerId,
        ownerEmail: ownerProfile.email,
        ownerPhone: parsedPetData.phone || ownerProfile.phone,

        ownerName: ownerProfile.name,
        category: category.toUpperCase(),
        photos,
      };

      if (category === "OWNED") {
        petDoc.petName =
          parsedPetData.petName && parsedPetData.petName.trim() !== ""
            ? parsedPetData.petName.trim()
            : "Unnamed Pet";

        petDoc.petName = parsedPetData.petName;
        petDoc.species = parsedPetData.species;
        petDoc.breed = parsedPetData.breed || "Mixed/Unknown";
        petDoc.healthNotes = parsedPetData.healthNotes || "";
        petDoc.ownerNote = parsedPetData.ownerNote || "";
      } else if (category === "LOST" || category === "FOUND") {
        petDoc.location = {
          latitude: parsedPetData.latitude,
          longitude: parsedPetData.longitude,
          address: parsedPetData.locationAddress,
        };
        petDoc.species = parsedPetData.species || "";
        petDoc.petName = parsedPetData.petName || "";
      } else if (category === "FOSTER") {
        petDoc.petName =
          parsedPetData.petName && parsedPetData.petName.trim() !== ""
            ? parsedPetData.petName.trim()
            : "Unnamed Pet";

        petDoc.species = parsedPetData.species;
        petDoc.breed = parsedPetData.breed || "Mixed/Unknown";
        petDoc.approximateAge = parsedPetData.approximateAge;
        petDoc.fosterDetails = {
          reason: parsedPetData.fosterReason,
          duration: parsedPetData.duration,
          careNotes: parsedPetData.careNotes || "",
        };
      }

      const newPet = await OwnerPet.create(petDoc);

      const shelters = await ShelterLogin.find({}).select("_id").lean();
      const shelterNotifications = shelters.map((shelter) => ({
        userId: shelter._id,
        userModel: "ShelterLogin",
        type: "general",
        title: "New Pet Added by Owner",
        message: `${ownerProfile.name} added a ${category.toLowerCase()} pet${
          petDoc.petName ? ` named ${petDoc.petName}` : ""
        }`,
        metadata: {
          petId: newPet._id,
          category: category,
          ownerId,
        },
      }));

      if (shelterNotifications.length > 0) {
        await Notification.insertMany(shelterNotifications);
      }

      if (req.app.locals.io) {
        shelters.forEach((shelter) => {
          req.app.locals.io.to(`user:${shelter._id}`).emit("notification:new", {
            title: "New Pet Added by Owner",
            message: `${
              ownerProfile.name
            } added a ${category.toLowerCase()} pet`,
            type: "general",
            read: false,
            createdAt: new Date(),
          });
        });
      }

      return res.status(201).json({
        success: true,
        message: "Pet added successfully",
        data: newPet,
      });
    } catch (error) {
      console.error("Add pet error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to add pet",
      });
    }
  },

  getMyPets: async (req, res) => {
    try {
      const ownerId = req.userId;
      const { category, status } = req.query;

      const filter = { ownerId };
      if (category) filter.category = category.toUpperCase();
      if (status) filter.status = status;

      const pets = await OwnerPet.find(filter).sort({ createdAt: -1 }).lean();

      return res.json({
        success: true,
        data: pets,
        total: pets.length,
      });
    } catch (error) {
      console.error("Get pets error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch pets",
      });
    }
  },

  getPetById: async (req, res) => {
    try {
      const { petId } = req.params;
      const ownerId = req.userId;

      const pet = await OwnerPet.findOne({
        _id: petId,
        ownerId,
      }).lean();

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
      console.error("Get pet by ID error:", error);
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
      const ownerId = req.userId;

      if (!["active", "resolved", "archived"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      const pet = await OwnerPet.findOneAndUpdate(
        { _id: petId, ownerId },
        { status },
        { new: true }
      );

      if (!pet) {
        return res.status(404).json({
          success: false,
          message: "Pet not found",
        });
      }

      return res.json({
        success: true,
        message: "Pet status updated",
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

  deletePet: async (req, res) => {
    try {
      const { petId } = req.params;
      const ownerId = req.userId;

      const pet = await OwnerPet.findOneAndDelete({
        _id: petId,
        ownerId,
      });

      if (!pet) {
        return res.status(404).json({
          success: false,
          message: "Pet not found",
        });
      }

      return res.json({
        success: true,
        message: "Pet deleted successfully",
      });
    } catch (error) {
      console.error("Delete pet error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete pet",
      });
    }
  },

  updatePet: async (req, res) => {
    try {
      const { petId } = req.params;
      const ownerId = req.userId;
      const { category, petData } = req.body;

      const parsedPetData =
        typeof petData === "string" ? JSON.parse(petData) : petData;

      const existingPet = await OwnerPet.findOne({ _id: petId, ownerId });
      if (!existingPet) {
        return res.status(404).json({
          success: false,
          message: "Pet not found",
        });
      }

      const normalizedCategory = (
        category || existingPet.category
      ).toUpperCase();

      let photos = parsedPetData.existingPhotos || existingPet.photos;

      if (req.files && req.files.length > 0) {
        const newPhotos = [];
        for (const file of req.files) {
          const result = await uploadToCloudinary(file.buffer, "owner-pets");
          newPhotos.push(result.secure_url);
        }
        photos = [...photos, ...newPhotos];
      }

      if (!photos || photos.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one photo is required",
        });
      }

      const updateDoc = {
        photos,
        category: normalizedCategory,
      };

      if (parsedPetData.phone) {
        updateDoc.ownerPhone = parsedPetData.phone;
      }

      /* ================= OWNED ================= */
      if (normalizedCategory === "OWNED") {
        if (parsedPetData.petName !== undefined)
          updateDoc.petName = parsedPetData.petName;
        if (parsedPetData.species !== undefined)
          updateDoc.species = parsedPetData.species;
        if (parsedPetData.breed !== undefined)
          updateDoc.breed = parsedPetData.breed || "Mixed/Unknown";
        if (parsedPetData.healthNotes !== undefined)
          updateDoc.healthNotes = parsedPetData.healthNotes || "";
        if (parsedPetData.ownerNote !== undefined)
          updateDoc.ownerNote = parsedPetData.ownerNote || "";
      } else if (
        /* ================= LOST / FOUND ================= */
        normalizedCategory === "LOST" ||
        normalizedCategory === "FOUND"
      ) {
        if (
          parsedPetData.latitude !== undefined &&
          parsedPetData.longitude !== undefined
        ) {
          updateDoc.location = {
            latitude: parsedPetData.latitude,
            longitude: parsedPetData.longitude,
            address: parsedPetData.locationAddress || "",
          };
        }

        if (parsedPetData.species !== undefined)
          updateDoc.species = parsedPetData.species || "";
        if (parsedPetData.petName !== undefined)
          updateDoc.petName = parsedPetData.petName || "";
      } else if (normalizedCategory === "FOSTER") {
        /* ================= FOSTER ================= */
        if (parsedPetData.species !== undefined)
          updateDoc.species = parsedPetData.species;
        if (parsedPetData.breed !== undefined)
          updateDoc.breed = parsedPetData.breed || "Mixed/Unknown";
        if (parsedPetData.approximateAge !== undefined)
          updateDoc.approximateAge = parsedPetData.approximateAge;

        updateDoc.fosterDetails = {
          reason:
            parsedPetData.fosterReason ||
            existingPet.fosterDetails?.reason ||
            "",
          duration:
            parsedPetData.duration || existingPet.fosterDetails?.duration || "",
          careNotes:
            parsedPetData.careNotes ||
            existingPet.fosterDetails?.careNotes ||
            "",
        };
      }

      const updatedPet = await OwnerPet.findByIdAndUpdate(petId, updateDoc, {
        new: true,
      });

      return res.json({
        success: true,
        message: "Pet updated successfully",
        data: updatedPet,
      });
    } catch (error) {
      console.error("Update pet error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to update pet",
      });
    }
  },
};

export default ownerPetsController;
