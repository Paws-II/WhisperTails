import mongoose from "mongoose";

const ownerBlogSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OwnerLogin",
      required: true,
      unique: true,
      index: true,
    },
    image: {
      type: String,
      required: true,
    },
    imagePosition: {
      type: String,
      enum: ["left", "right"],
      default: "right",
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    content: {
      type: String,
      required: true,
      maxlength: 3000,
      trim: true,
    },
    wordCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

ownerBlogSchema.pre("save", function (next) {
  if (this.content) {
    this.wordCount = this.content.trim().split(/\s+/).length;
  }
});

export default mongoose.model("OwnerBlog", ownerBlogSchema);
