import OwnerBlog from "../../models/blogs/OwnerBlog.js";
import OwnerProfile from "../../models/profiles/OwnerProfile.js";
import Notification from "../../models/notifications/Notification.js";
import { uploadToCloudinary } from "../../services/cloudinary.service.js";

const ownerBlogController = {
  getBlog: async (req, res) => {
    try {
      const blog = await OwnerBlog.findOne({ ownerId: req.userId }).populate(
        "ownerId",
        "email"
      );

      if (!blog) {
        return res.json({
          success: true,
          blog: null,
          message: "No blog found",
        });
      }

      const profile = await OwnerProfile.findOne({ ownerId: req.userId });

      return res.json({
        success: true,
        blog: {
          ...blog.toObject(),
          ownerName: profile?.name || "Owner",
        },
      });
    } catch (error) {
      console.error("Get blog error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch blog",
      });
    }
  },

  createBlog: async (req, res) => {
    try {
      const { imagePosition, content, title } = req.body;

      const existingBlog = await OwnerBlog.findOne({ ownerId: req.userId });
      if (existingBlog) {
        return res.status(400).json({
          success: false,
          message: "You already have a blog. Please update it instead.",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Blog image is required",
        });
      }

      if (!content || content.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Blog content is required",
        });
      }

      if (!title || !title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Blog title is required",
        });
      }

      const wordCount = content.trim().split(/\s+/).length;
      if (wordCount > 500) {
        return res.status(400).json({
          success: false,
          message: "Content exceeds 500 words limit",
        });
      }

      const result = await uploadToCloudinary(
        req.file.buffer,
        "whispertails/blogs/owners"
      );

      const blog = new OwnerBlog({
        ownerId: req.userId,
        title: title.trim(),
        image: result.secure_url,
        imagePosition: imagePosition || "right",
        content: content.trim(),
        wordCount,
      });

      await blog.save();

      const profile = await OwnerProfile.findOne({ ownerId: req.userId });

      const notification = new Notification({
        userId: req.userId,
        userModel: "OwnerLogin",
        type: "general",
        title: "Blog Created",
        message: "Your blog has been published successfully",
        metadata: { blogId: blog._id },
      });
      await notification.save();

      if (global.io) {
        global.io.to(`user:${req.userId}`).emit("notification:new", {
          type: "success",
          title: "Blog Created",
          message: "Your blog has been published successfully",
          timestamp: Date.now(),
        });
      }

      return res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog: {
          ...blog.toObject(),
          ownerName: profile?.name || "Owner",
        },
      });
    } catch (error) {
      console.error("Create blog error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to create blog",
      });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const { imagePosition, content, title } = req.body;

      const blog = await OwnerBlog.findOne({ ownerId: req.userId });
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found. Please create one first.",
        });
      }

      const updateData = {};

      if (req.file) {
        const result = await uploadToCloudinary(
          req.file.buffer,
          "whispertails/blogs/owners"
        );
        updateData.image = result.secure_url;
      }

      if (imagePosition) {
        updateData.imagePosition = imagePosition;
      }

      if (title !== undefined) {
        if (!title.trim()) {
          return res.status(400).json({
            success: false,
            message: "Blog title cannot be empty",
          });
        }
        updateData.title = title.trim();
      }

      if (content !== undefined) {
        if (content.trim().length === 0) {
          return res.status(400).json({
            success: false,
            message: "Blog content cannot be empty",
          });
        }

        const wordCount = content.trim().split(/\s+/).length;
        if (wordCount > 500) {
          return res.status(400).json({
            success: false,
            message: "Content exceeds 500 words limit",
          });
        }

        updateData.content = content.trim();
        updateData.wordCount = wordCount;
      }

      const updatedBlog = await OwnerBlog.findByIdAndUpdate(
        blog._id,
        updateData,
        { new: true, runValidators: true }
      );

      const profile = await OwnerProfile.findOne({ ownerId: req.userId });

      const notification = new Notification({
        userId: req.userId,
        userModel: "OwnerLogin",
        type: "general",
        title: "Blog Updated",
        message: "Your blog has been updated successfully",
        metadata: { blogId: updatedBlog._id },
      });
      await notification.save();

      if (global.io) {
        global.io.to(`user:${req.userId}`).emit("notification:new", {
          type: "success",
          title: "Blog Updated",
          message: "Your blog has been updated successfully",
          timestamp: Date.now(),
        });
      }

      return res.json({
        success: true,
        message: "Blog updated successfully",
        blog: {
          ...updatedBlog.toObject(),
          ownerName: profile?.name || "Owner",
        },
      });
    } catch (error) {
      console.error("Update blog error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to update blog",
      });
    }
  },
};

export default ownerBlogController;
