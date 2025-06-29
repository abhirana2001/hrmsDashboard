import cron from "node-cron";
import { autoCreateDailyPresentAttendance } from "../controller/attendanceController.js";

cron.schedule("0 0 * * *", () => {
  console.log("🕛 Creating default 'Present' attendance for all employees");
  autoCreateDailyPresentAttendance();
});
