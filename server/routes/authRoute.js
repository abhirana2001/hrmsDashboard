import express from "express";
import { createUser, loginUser } from "../controller/authController.js";
import { verifyToken } from "../services/jwsToken.js";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/check", verifyToken);

export default router;
