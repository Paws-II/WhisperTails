import express from "express";
import shelterPetManagementController from "../../controllers/shelter/shelterPetManagement.js";
import {
  authenticateJWT,
  authorizeRole,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateJWT, authorizeRole("shelter"));

router.get("/", shelterPetManagementController.getAllOwnerPets);

router.get("/:petId", shelterPetManagementController.getPetDetails);

router.patch("/:petId/status", shelterPetManagementController.updatePetStatus);

export default router;
