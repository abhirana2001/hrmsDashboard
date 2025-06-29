import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
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
    designation: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    docUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
leaveSchema.index({ employee: 1, date: 1 }, { unique: true });
const leaves = mongoose.model("LeaveRequest", leaveSchema);

export default leaves;
