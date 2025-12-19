import PetProfile from "../../models/profiles/PetProfile.js";
import ShelterProfile from "../../models/profiles/ShelterProfile.js";
import Notification from "../../models/notifications/Notification.js";
import { uploadToCloudinary } from "../../services/cloudinary.service.js";
import { broadcastDashboardUpdate } from "../../socket/handlers/dashboardHandler.js";

const petController = {
  createPet: async (req, res) => {
    try {
      const shelterId = req.userId;

      const shelter = await ShelterProfile.findOne({ shelterId });
      if (!shelter) {
        return res.status(404).json({
          success: false,
          message: "Shelter profile not found",
        });
      }

      if (shelter.currentPets >= shelter.capacity) {
        return res.status(400).json({
          success: false,
          message: "Shelter has reached maximum capacity",
        });
      }

      const {
        name,
        species,
        breed,
        gender,
        dateOfBirth,
        age,
        ageUnit,
        size,
        color,
        vaccinated,
        neutered,
        medicalNotes,
        temperament,
        trained,
        specialNeeds,
        adoptionFee,
        description,
      } = req.body;

      if (!name || !species) {
        return res.status(400).json({
          success: false,
          message: "Pet name and species are required",
        });
      }

      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map((file) =>
          uploadToCloudinary(file.buffer, "pets")
        );
        const uploadResults = await Promise.all(uploadPromises);
        imageUrls = uploadResults.map((result) => result.secure_url);
      }

      const parsedTemperament = temperament ? JSON.parse(temperament) : [];

      const newPet = new PetProfile({
        shelterId,
        name,
        species,
        breed: breed || "Unknown",
        gender: gender || "unknown",
        dateOfBirth: dateOfBirth || null,
        age: age ? parseInt(age) : null,
        ageUnit: ageUnit || "years",
        size: size || "medium",
        color: color || "",
        images: imageUrls,
        vaccinated: vaccinated === "true" || vaccinated === true,
        neutered: neutered === "true" || neutered === true,
        medicalNotes: medicalNotes || "",
        temperament: parsedTemperament,
        trained: trained === "true" || trained === true,
        specialNeeds: specialNeeds === "true" || specialNeeds === true,
        adoptionStatus: "available",
        adoptionFee: adoptionFee ? parseFloat(adoptionFee) : 0,
        description: description || "",
        isActive: true,
      });

      await newPet.save();

      shelter.currentPets += 1;
      await shelter.save();

      await Notification.create({
        userId: shelterId,
        userModel: "ShelterLogin",
        type: "general",
        title: "Pet Added Successfully",
        message: `${name} has been added to your shelter`,
        metadata: { petId: newPet._id },
      });

      if (req.app.locals.io) {
        broadcastDashboardUpdate(req.app.locals.io, shelterId, "pet:added", {
          pet: newPet,
          currentPets: shelter.currentPets,
        });

        req.app.locals.io.to(`user:${shelterId}`).emit("notification:new", {
          type: "general",
          title: "Pet Added Successfully",
          message: `${name} has been added to your shelter`,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Pet profile created successfully",
        data: {
          pet: newPet,
          currentPets: shelter.currentPets,
        },
      });
    } catch (error) {
      console.error("Create pet error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to create pet profile",
      });
    }
  },

  getShelterPets: async (req, res) => {
    try {
      const shelterId = req.userId;
      const { status, limit = 10 } = req.query;

      const query = { shelterId, isActive: true };
      if (status) {
        query.adoptionStatus = status;
      }

      const pets = await PetProfile.find(query)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));

      return res.json({
        success: true,
        data: pets,
      });
    } catch (error) {
      console.error("Get shelter pets error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch pets",
      });
    }
  },

  getPetById: async (req, res) => {
    try {
      const { petId } = req.params;
      const shelterId = req.userId;

      const pet = await PetProfile.findOne({
        _id: petId,
        shelterId,
        isActive: true,
      });

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
      console.error("Get pet error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch pet details",
      });
    }
  },
};

export default petController;
