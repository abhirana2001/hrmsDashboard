import express from "express";
import {
  getTodayAttendance,
  updateAttendance,
} from "../controller/attendanceController.js";

const router = express.Router();

router.route("/").get(getTodayAttendance);
router.route("/present-today").get(getTodayAttendance);

router.route("/:id").patch(updateAttendance);

export default router;
