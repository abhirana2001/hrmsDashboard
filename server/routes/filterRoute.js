import {
  filterAttendance,
  getTodayAttendance,
  searchTodayPresentByName,
} from "../controller/attendanceController.js";
import express from "express";
import { filterCandidate } from "../controller/candidateController.js";
import { filterEmployees } from "../controller/employeeController.js";
import {
  filterLeaves,
  findLeavesByDate,
} from "../controller/leaveController.js";

const router = express.Router();

router.route("/").get(getTodayAttendance);
router.route("/present-byname").get(searchTodayPresentByName);
router.route("/candidate").get(filterCandidate);
router.route("/employee").get(filterEmployees);
router.route("/attendance").get(filterAttendance);
router.route("/leave").get(filterLeaves);
router.route("/leave-by-date").get(findLeavesByDate);

export default router;
