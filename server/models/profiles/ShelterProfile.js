import mongoose from "mongoose";

const shelterProfileSchema = new mongoose.Schema(
  {
    shelterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShelterLogin",
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      default: "shelter",
      immutable: true,
    },

    name: {
      type: String,
      default: "New Shelter",
      trim: true,
    },

    avatar: {
      type: String,
      default: "url",
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    specialization: {
      type: String,
      default: "General Pet Care",
    },

    experience: {
      type: Number,
      default: 0, // years
      min: 0,
    },

    capacity: {
      type: Number,
      default: 0, // set the max
      min: 0,
    },

    currentPets: {
      type: Number,
      default: 0,
      min: 0,
    },

    bio: {
      type: String,
      default: "Certified shelter dedicated to rescue, care, and adoption.",
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    lastActiveAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ShelterProfile", shelterProfileSchema);
