import mongoose from "mongoose";

// set rule
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ["admin", "user"],
  },
});

// create table
const Admin = mongoose.model("Admin", userSchema);

export default Admin;
