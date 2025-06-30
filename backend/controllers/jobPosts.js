import User from "../models/userModel.js";
import JobPost from "../models/jobPostModel.js";
import Applicant from "../models/applicants.js";

// create a job post
export const createJobPost = async (req, res) => {
  try {
    const {
      title,
      description,
      position,
      employerId,
      location,
      jobType,
      experienceLevel,
    } = req.body;

    const user = await User.findById(employerId);

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    if (user && user.role === "candidate")
      return res
        .status(403)
        .json({ message: "You are not authorized!", success: false });

    const jobPost = new JobPost({
      title,
      description,
      position,
      employerId,
      location,
      jobType,
      experienceLevel,
    });

    await jobPost.save();

    return res.status(201).json({ message: "Job post created", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

// get job post by (employer or admin)
export const getJobPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    if (!userId)
      return res
        .status(400)
        .json({ message: "user id is required", success: false });

    const jobPosts = await JobPost.find({ employerId: userId }).populate(
      "employerId",
      "-password"
    );

    if (jobPosts.length === 0)
      return res
        .status(404)
        .json({ message: "No job posts found!", success: false });

    return res
      .status(200)
      .json({ message: "Job posts fetched", success: true, data: jobPosts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};

// Delete the job post
export const deleteJobPost = async (req, res) => {
  try {
    const jobPostId = req.params?.id;

    if (!jobPostId || jobPostId === "undefined") {
      return res
        .status(400)
        .json({ message: "Job post id is required", success: false });
    }

    const jobPost = await JobPost.findById(jobPostId).populate(
      "employerId",
      "-password"
    );

    if (!jobPost)
      return res
        .status(404)
        .json({ message: "no job post found", success: false });

    const requesterId = req.user?.id;
    const requesterRole = req.user?.role;

    // only employer or admin can be delete the job post
    if (
      requesterId === jobPost.employerId._id.toString() ||
      requesterRole === "admin" ||
      requesterRole === "employer"
    ) {
      await JobPost.findByIdAndDelete(jobPostId);

      return res
        .status(200)
        .json({ message: "Job post deleted", success: true });
    } else {
      return res
        .status(403)
        .json({ message: "Not Authorized", success: false });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

// update the post
export const updateJobPost = async (req, res) => {
  try {
    const id = req.params?.id;

    if (!id || id === "undefined") {
      return res
        .status(400)
        .json({ message: "Job post id is required", success: false });
    }

    const jobPost = await JobPost.findById(id).populate(
      "employerId",
      "-password"
    );

    if (!jobPost)
      return res
        .status(404)
        .json({ message: "no job post found", success: false });

    const requesterId = req.user?.id;
    const requesterRole = req.user?.role;

    if (
      requesterId === jobPost.employerId._id.toString() ||
      requesterRole === "admin" ||
      requesterRole === "employer"
    ) {
      const updatedJobPost = await JobPost.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        message: "Job post Updated",
        success: true,
        data: updatedJobPost,
      });
    } else {
      return res
        .status(403)
        .json({ message: "Not Authorized", success: false });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

// Get all Job post
export const getJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find().populate("employerId", "username _id");
    res.status(200).json({ data: jobs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
