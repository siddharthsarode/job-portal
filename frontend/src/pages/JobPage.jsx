import { useState } from "react";
import { useEffect } from "react";
import JobPostCard from "../components/JobPostCard";
const JobPage = () => {
  const [jobPost, setJobPost] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/jobPost`);
        const result = await res.json();

        if (!res.ok) throw new Error(result.message || "no data found");
        setJobPost(result.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getJobs();
  }, []);
  return (
    <div className="w-full h-full py-20">
      <h1 className="text-primary text-3xl font-semibold my-6 text-center">
        Get your job
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4  min-h-screen">
        {jobPost.length > 0 &&
          jobPost.map((job, idx) => <JobPostCard key={idx} job={job} />)}
      </div>
    </div>
  );
};

export default JobPage;
