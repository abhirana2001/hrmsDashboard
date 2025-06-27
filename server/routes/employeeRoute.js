import express from "express";
import {
  deleteEmployee,
  getAllEmployees,
} from "../controller/employeeController.js";

const router = express.Router();

router.route("/").get(getAllEmployees);

router.route("/:id").delete(deleteEmployee);

export default router;
