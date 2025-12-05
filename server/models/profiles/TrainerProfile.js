import mongoose from "mongoose";

const trainerProfileSchema = new mongoose.Schema(
  {
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainerLogin",
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "trainer",
      immutable: true,
    },

    name: {
      type: String,
      default: "New Trainer",
    },

    avatar: {
      type: String,
      default: "url",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    specialization: {
      type: String,
      default: "General Pet Training",
    },

    experience: {
      type: Number,
      default: 0,
    },

    bio: {
      type: String,
      default: "Certified trainer with a passion for pet behavior and care.",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TrainerProfile", trainerProfileSchema);
