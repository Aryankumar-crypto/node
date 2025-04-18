import mongoose from "mongoose";
import { MONGODB_URI } from "#@/utils/index";

export const connectdb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return true;
    }
    // console.log("hit-satyam", MONGODB_URI);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 6000,
    });
    // console.log("hitdb");

    return true;
  } catch (error) {
    console.log("Error---->", error.message);
    return false;
  }
};
export const getConnectionState = () => {
  return mongoose.connection.readyState == 1 ? true : false;
};
