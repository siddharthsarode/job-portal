import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ApplyJobModal from "./ApplyJobModal";
import { toast } from "react-toastify";

const JobPostCard = ({ job }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    let data = {
      ...formData,
      employerId: job.employerId._id,
      candidateId: user.id,
      jobPostId: job._id,
    };

    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/jobPost/apply`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok)
        throw new Error(result.message || "Applied Failed, Try later!");
      toast.success("Applied Successful");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-light rounded-xl shadow-md p-6 border border-ternary hover:shadow-lg transition duration-300">
      <div className="mb-2">
        <span className="text-sm text-gray-500">Posted by </span>
        <span className="text-primary font-semibold">
          {job.employerId.username}
        </span>
      </div>

      <h2 className="text-xl font-bold text-dark">{job.title}</h2>

      <p className="text-gray-700 mt-2">{job.description.slice(0, 40)}...</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
        <div>
          <span className="font-medium text-secondary">Position:</span>
          {job.position}
        </div>
        <div>
          <span className="font-medium text-secondary">Location:</span>
          {job.location}
        </div>
        <div>
          <span className="font-medium text-secondary">Job Type:</span>
          <span className="capitalize">{job.jobType}</span>
        </div>
        <div>
          <span className="font-medium text-secondary">Experience:</span>
          <span className="capitalize">{job.experienceLevel}</span>
        </div>
        <div className="col-span-1 sm:col-span-2 mt-2">
          {job.isActive ? (
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              Active
            </span>
          ) : (
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
              Inactive
            </span>
          )}
        </div>
        <div className="mt-6">
          {user ? (
            user.role === "candidate" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-primary cursor-pointer hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Apply
              </button>
            )
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-primary cursor-pointer hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Login to Apply
            </button>
          )}
        </div>
      </div>

      <ApplyJobModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
        loading={loading}
      />
    </div>
  );
};

export default JobPostCard;
