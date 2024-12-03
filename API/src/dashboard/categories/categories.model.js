import mongoose from "mongoose";

// set schema
const categoriesSchema = new mongoose.Schema(
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
    image: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
      minlength: 10,
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

// create collection
const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
