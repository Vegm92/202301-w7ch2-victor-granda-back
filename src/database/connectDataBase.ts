import mongoose from "mongoose";

const connectDataBase = async (url: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);
  } catch (error: unknown) {
    throw new Error("Error while connecting to data base.");
  }
};

export default connectDataBase;
