import Applicant from "../models/applicants.js";

// Apply to the job post
export const applyToJob = async (req, res) => {
  try {
    const { email, resumeLink, employerId, candidateId, jobPostId } = req.body;

    if (!email || !resumeLink || !employerId || !candidateId || !jobPostId) {
      return res.status(400).json({ message: "All field required" });
    }

    if (req.user && req.user.role !== "candidate") {
      return res.status(403).json({ message: "Only candidates can apply" });
    }

    const alreadyApply = await Applicant.findOne({
      candidateId,
      jobPostId,
      status: "applied",
    });

    if (alreadyApply)
      return res
        .status(409)
        .json({ message: "You already applied for this job" });

    const applicant = new Applicant({
      candidateEmail: email,
      resumeUrl: resumeLink,
      employerId,
      candidateId,
      jobPostId,
    });

    await applicant.save();

    return res
      .status(201)
      .json({ message: "Application submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get application by candidate
export const getApplicationsByCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;

    if (!candidateId) {
      return res.status(400).json({ message: "Candidate ID is required" });
    }

    const applications = await Applicant.find({ candidateId })
      .populate("jobPostId", "title position location jobType")
      .sort({ appliedAt: -1 });

    if (applications.length == 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.status(200).json({ message: "Application fetch", data: applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// get application by Employer
export const getApplicationsByEmployer = async (req, res) => {
  try {
    const { employerId } = req.params;

    if (!employerId) {
      return res.status(400).json({ message: "Employer ID is required" });
    }

    const applications = await Applicant.find({ employerId })
      .populate("jobPostId", "title position location jobType")
      .populate("candidateId", "username email mobile")
      .sort({ appliedAt: -1 });

    if (applications.length == 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.status(200).json({ message: "Application fetch", data: applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
