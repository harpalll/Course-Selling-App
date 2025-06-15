import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dbUser:dbUserPassword@cluster0.kbakw.mongodb.net/"
    );
    console.log("Connected To Db Successfully.");
  } catch (e) {
    console.log("Error Connecting To Db", e);
  }
};
