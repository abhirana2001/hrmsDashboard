import express from "express";
import {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveCountByDay,
  updateLeaveStatus,
} from "../controller/leaveController.js";
import upload from "../middleware/multerMiddleware.js";
const router = express.Router();

router.route("/dateCount").get(getLeaveCountByDay);
router
  .route("/")
  .post(upload.single("documentation"), createLeaveRequest)
  .get(getAllLeaveRequests);

router.route("/:id").patch(updateLeaveStatus);

export default router;
