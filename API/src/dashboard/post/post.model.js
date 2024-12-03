import mongoose from "mongoose";

// set Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 75,
      minlength: 5,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
      minlength: 10,
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
    seoTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },
    seoKeywords: {
      type: [String],
      required: true,
      maxlength: 500,
    },
    seoDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
      minlength: 10,
    },
    remark: {
      type: Number,
      required: false,
      default: null,
    },
    status: {
      type: Number,
      default: 1,
    },
    adminId: {
      type: mongoose.ObjectId,
      required: true,
      ref: "admins",
    },
  },
  {
    timestamps: true,
  }
);

// creat collection
const Post = mongoose.model("Post", postSchema);

export default Post;
