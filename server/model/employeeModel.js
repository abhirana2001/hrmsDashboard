import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phoneNo: {
      type: String,
      required: true,
    },

    position: {
      type: String,
    },

    department: {
      type: String,
    },
    experience: Number,

    dateOfJoining: {
      type: Date,
      required: true,
      default: Date.now,
    },
    resumeUrl: {
      type: String,
    },
  },
  { timestamps: true }
);
const employee = mongoose.model("Employee", employeeSchema);

export default employee;
