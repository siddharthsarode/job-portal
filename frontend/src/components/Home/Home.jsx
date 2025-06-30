import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex justify-center items-center gap-5 flex-col">
      <h1 className="text-5xl text-primary font-bold">Best Job Portal</h1>
      <button
        onClick={() => navigate("/jobs")}
        className="bg-primary rounded-lg cursor-pointer px-8 py-3 text-sm text-white"
      >
        Getting Start
      </button>
    </div>
  );
};

export default Home;
