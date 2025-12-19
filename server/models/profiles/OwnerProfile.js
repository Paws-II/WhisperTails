import mongoose from "mongoose";

const ownerProfileSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OwnerLogin",
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
      default: "owner",
      immutable: true,
    },

    name: {
      type: String,
      default: "New Owner",
      trim: true,
    },

    avatar: {
      type: String,
      default: "something(url)",
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

    bio: {
      type: String,
      default: "I love pets and responsible ownership!",
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

export default mongoose.model("OwnerProfile", ownerProfileSchema);
