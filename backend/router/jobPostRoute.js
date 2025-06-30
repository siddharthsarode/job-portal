import express from "express";
import {
  createJobPost,
  deleteJobPost,
  getJobPosts,
  getJobs,
  updateJobPost,
} from "../controllers/jobPosts.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { jobPostValidationSchema } from "../validations/jobPostValidation.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  applyToJob,
  getApplicationsByCandidate,
  getApplicationsByEmployer,
} from "../controllers/jobApplication.js";

const router = express.Router();

router.post(
  "/",
  verifyUser,
  validateSchema(jobPostValidationSchema),
  createJobPost
);
router.post("/apply", verifyUser, applyToJob);

router.get("/:id", getJobPosts);
// Get all jobs
router.get("/", getJobs);

// Get job applications applied by candidate
router.get("/apply/:candidateId", verifyUser, getApplicationsByCandidate);

// get job application in employer section
router.get("/applicants/:employerId", verifyUser, getApplicationsByEmployer);

router.delete("/:id", verifyUser, deleteJobPost);
router.put(
  "/:id",
  verifyUser,
  validateSchema(jobPostValidationSchema),
  updateJobPost
);

export default router;
