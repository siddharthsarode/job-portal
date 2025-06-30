import mongoose from "mongoose";

const applicantsSchema = new mongoose.Schema({
  jobPostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPost",
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  candidateEmail: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ["applied", "reviewed", "shortlisted", "rejected", "accepted"],
    default: "applied",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Applicant ||
  mongoose.model("Applicant", applicantsSchema);
