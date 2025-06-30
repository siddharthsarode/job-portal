import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";

const PostJob = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { user } = useAuth();
  const url = import.meta.env.VITE_APP_BASE_URL;

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${url}/jobPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...data, employerId: user.id }),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Post Failed");
      toast.success(result.message || "Post added");
      reset();
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Post not added");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-light">
      <h2 className="text-2xl font-bold text-primary text-center mb-6">
        Post a Job
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block font-medium text-dark mb-1">Job Title</label>
          <input
            type="text"
            {...register("title", {
              required: "Job title is required",
              minLength: {
                value: 10,
                message: "Job title at least 10 char",
              },
            })}
            placeholder="e.g., Software Engineer"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.title && (
            <p className="text-red text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-dark mb-1">
            Job Description
          </label>
          <textarea
            rows="4"
            {...register("description", {
              required: "Job description is required",
              minLength: {
                value: 20,
                message: "Description at least 20 char",
              },
            })}
            placeholder="Describe the job role and responsibilities"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          {errors.description && (
            <p className="text-red text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Position */}
        <div>
          <label className="block font-medium text-dark mb-1">Position</label>
          <input
            type="text"
            {...register("position", {
              required: "Position is required",
              minLength: {
                value: 3,
                message: "Position at least 3 char",
              },
            })}
            placeholder="e.g., Frontend Developer"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.position && (
            <p className="text-red text-sm mt-1">{errors.position.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium text-dark mb-1">Location</label>
          <input
            type="text"
            {...register("location", {
              required: "Location is required",
              minLength: {
                value: 3,
                message: "Location at least 3 char",
              },
            })}
            placeholder="e.g., Mumbai"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.location && (
            <p className="text-red text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

        {/* Job Type */}
        <div>
          <label className="block font-medium text-dark mb-1">Job Type</label>
          <select
            {...register("jobType", { required: "Job type is required" })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select job type</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
          {errors.jobType && (
            <p className="text-red text-sm mt-1">{errors.jobType.message}</p>
          )}
        </div>

        {/* Experience Level */}
        <div>
          <label className="block font-medium text-dark mb-1">
            Experience Level
          </label>
          <select
            {...register("experienceLevel", {
              required: "Experience level is required",
            })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select experience level</option>
            <option value="fresher">Fresher</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
            <option value="any">Any</option>
          </select>
          {errors.experienceLevel && (
            <p className="text-red text-sm mt-1">
              {errors.experienceLevel.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-dark transition"
        >
          {isSubmitting ? <Loader /> : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
