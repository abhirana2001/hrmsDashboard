import express from "express";
import {
  createCandidate,
  deleteCandidate,
  getAllCandidates,
  updateCandidate,
} from "../controller/candidateController.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(upload.single("resume"), createCandidate)
  .get(getAllCandidates);

router.route("/:id").patch(updateCandidate).delete(deleteCandidate);

export default router;
