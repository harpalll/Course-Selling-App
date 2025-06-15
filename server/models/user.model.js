import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  courses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  ],
});

export const User = mongoose.model("User", userSchema);
