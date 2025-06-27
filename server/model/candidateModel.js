import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true },
    phoneNo: String,
    resumeUrl: String,
    experience: Number,
    position: String,
    status: {
      type: String,
      enum: ["New", "Scheduled", "Ongoing", "Selected", "Rejected"],
      default: "New",
    },
  },
  { timestamps: true }
);

const candidate = mongoose.model("candidate", candidateSchema);

export default candidate;
