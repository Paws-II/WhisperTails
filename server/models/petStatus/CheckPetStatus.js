import mongoose from "mongoose";

const checkPetStatusSchema = new mongoose.Schema(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PetProfile",
      required: true,
      unique: true,
      index: true,
    },
    petName: {
      type: String,
      required: true,
    },
    activeOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OwnerLogin",
      default: null,
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdoptionApplication",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CheckPetStatus", checkPetStatusSchema);
