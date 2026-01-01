import express from "express";
import ownerPetsController from "../../controllers/owner/ownerPets.js";
import {
  authenticateJWT,
  authorizeRole,
} from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/multer.js";

const router = express.Router();

router.use(authenticateJWT, authorizeRole("owner"));

router.post("/", upload.array("photos", 5), ownerPetsController.addPet);
router.get("/", ownerPetsController.getMyPets);
router.get("/:petId", ownerPetsController.getPetById);
router.put("/:petId", upload.array("photos", 5), ownerPetsController.updatePet);
router.patch("/:petId/status", ownerPetsController.updatePetStatus);
router.delete("/:petId", ownerPetsController.deletePet);

export default router;
