import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "internship", "remote"],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["fresher", "junior", "mid", "senior", "lead", "any"],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.JobPost ||
  mongoose.model("JobPost", jobPostSchema);
