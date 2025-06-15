import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

export const Admin = mongoose.model("Admin", adminSchema);
