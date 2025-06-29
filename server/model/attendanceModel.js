import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    position: {
      type: String,
    },

    department: {
      type: String,
    },
    status: {
      type: String,
      default: "Present",
    },
    task: {
      type: String,
      default: "--",
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

const attendance = mongoose.model("Attendance", attendanceSchema);
export default attendance;
