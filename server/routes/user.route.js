import { Router } from "express";
import { authMiddleware, JWT_SECRET } from "../middlewares/auth.middlware.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const userRouter = Router();
userRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      message: "Missing Required Fields",
    });

  try {
    const user = await User.create({
      username,
      password,
    });

    if (user)
      res.status(200).json({
        message: "User Created Successfully.",
        user,
      });
  } catch (error) {
    return res.status(500).json({
      message: `Error Creating User`,
      error,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      message: "Missing Required Fields",
    });

  try {
    const user = await User.findOne({
      username,
      password,
    });

    if (!user) {
      return res.status(500).json({
        message: "User Not Found",
      });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );

    return res.status(200).json({
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in Login`,
      error,
    });
  }
});

userRouter.get("/courses", async (req, res) => {
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

userRouter.get("/course/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
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

userRouter.post("/courses/:courseId", authMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { courses: courseId },
      },
      { new: true }
    ).populate("courses");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Course purchased successfully.",
      purchasedCourses: updatedUser.courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in purchasing course`,
      error,
    });
  }
});

userRouter.get("/purchasedCourses", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const updatedUser = await User.findById(userId).populate("courses");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "purchased courses fetched successfully.",
      purchasedCourses: updatedUser.courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching purchased courses.`,
      err: error.message,
    });
  }
});

export { userRouter };
