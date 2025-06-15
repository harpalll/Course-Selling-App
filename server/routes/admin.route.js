import { Router } from "express";
import { authMiddleware, JWT_SECRET } from "../middlewares/auth.middlware.js";
import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { Course } from "../models/course.model.js";
import jwt from "jsonwebtoken";

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      message: "Missing Required Fields",
    });

  try {
    const admin = await Admin.create({
      username,
      password,
    });

    if (admin)
      res.status(200).json({
        message: "Admin Created Successfully.",
        admin,
      });
  } catch (error) {
    return res.status(500).json({
      message: `Error Creating Admin`,
      error,
    });
  }
});

adminRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      message: "Missing Required Fields",
    });

  try {
    const admin = await Admin.findOne({
      username,
      password,
    });

    if (admin) {
      const token = jwt.sign(
        {
          id: admin._id,
        },
        JWT_SECRET
      );

      return res.status(200).json({
        message: "Logged in successfully",
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Error in Login`,
      error,
    });
  }
});

adminRouter.post("/courses", authMiddleware, async (req, res) => {
  const { title, description, price, imageLink, published } = req.body;

  if (!title || !price)
    return res.status(400).json({
      message: "Missing Required Fields.",
    });

  try {
    const course = await Course.create({
      title,
      description,
      price,
      imageLink,
      published,
    });

    if (course)
      return res.status(200).json({
        message: "Course created successfully",
        courseId: course._id,
      });
  } catch (error) {
    return res.status(500).json({
      message: `Error in creating course`,
      error,
    });
  }
});

adminRouter.get("/course/:courseId", authMiddleware, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findOne({ _id: courseId });
    if (course)
      return res.status(200).json({
        message: "Course Fetched Successfully",
        course,
      });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching course.`,
      error,
    });
  }
});

adminRouter.put("/courses/:courseId", authMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const { title, description, price, imageLink, published } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description, price, imageLink, published },
      {
        new: true,
      }
    );

    if (updatedCourse)
      return res.status(200).json({
        message: "Course updated successfully",
        updatedCourse,
      });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating course`,
      error,
    });
  }
});

adminRouter.get("/courses", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    if (courses)
      return res.status(200).json({
        message: "Courses Fetched Successfully",
        courses,
      });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching courses.`,
      error,
    });
  }
});

adminRouter.get("/analytics", authMiddleware, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const courseCount = await Course.countDocuments();
    if (userCount && courseCount)
      return res.status(200).json({
        message: "Analytics Fetched Successfully",
        userCount,
        courseCount,
      });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching analytics.`,
      error,
    });
  }
});

export { adminRouter };
