//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
import express from "express";
import "dotenv/config";
import { connectToDb } from "./db/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
connectToDb();

// * Admin routes
import { adminRouter } from "./routes/admin.route.js";
import { userRouter } from "./routes/user.route.js";
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);

// * User routes

app.listen(port, () => {
  console.log("Server is listening on port 3000");
});
