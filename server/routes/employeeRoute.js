import express from "express";
import {
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "../controller/employeeController.js";

const router = express.Router();

router.route("/").get(getAllEmployees);

router.route("/:id").delete(deleteEmployee).patch(updateEmployee);

export default router;
