import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: {
    type: Boolean,
    default: true,
  },
});

export const Course = mongoose.model("Course", courseSchema);
