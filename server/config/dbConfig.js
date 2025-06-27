import mongoose from "mongoose";

export const dbConfig = async () => {
  try {
    const conn = mongoose.connect(process.env.DB_URL);
    console.log("db is connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
