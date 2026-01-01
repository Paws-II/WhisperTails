import mongoose from "mongoose";

const ownerPetSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OwnerLogin",
      required: true,
      index: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    ownerPhone: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["OWNED", "LOST", "FOUND", "FOSTER"],
      required: true,
      index: true,
    },
    petName: {
      type: String,
      trim: true,
    },
    species: {
      type: String,
      trim: true,
    },
    breed: {
      type: String,
      trim: true,
      default: "Mixed/Unknown",
    },
    approximateAge: {
      type: String,
      trim: true,
    },
    photos: [
      {
        type: String,
        required: true,
      },
    ],
    healthNotes: {
      type: String,
      trim: true,
      default: "",
    },
    ownerNote: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      latitude: Number,
      longitude: Number,
      address: String,
    },
    fosterDetails: {
      reason: String,
      duration: String,
      careNotes: String,
    },
    status: {
      type: String,
      enum: ["active", "resolved", "archived"],
      default: "active",
      index: true,
    },
    visibleToShelters: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ownerPetSchema.index({ ownerId: 1, category: 1, status: 1 });
ownerPetSchema.index({ createdAt: -1 });

export default mongoose.model("OwnerPet", ownerPetSchema);
