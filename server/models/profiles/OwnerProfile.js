import mongoose from "mongoose";

const ownerProfileSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OwnerLogin",
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "owner",
      immutable: true,
    },

    name: {
      type: String,
      default: "New Owner",
    },

    avatar: {
      type: String,
      default: "something(url)",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "I love pets and responsible ownership!",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("OwnerProfile", ownerProfileSchema);
