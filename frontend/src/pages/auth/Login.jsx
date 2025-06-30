import { useForm } from "react-hook-form";
import { FaUserTie, FaUserGraduate } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({});

  const onSubmit = async (data) => {
    const url = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000";
    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success("Login successfully");
      reset();
      setUser(result.user);
      switch (result.user.role) {
        case "candidate":
          navigate("/candidate");
          break;
        case "employer":
          navigate("/employer");
          break;
        case "admin":
          navigate("/admin");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-dark mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-dark"
            />
            {errors.email && (
              <p className="text-red text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-dark mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-dark"
            />
            {errors.password && (
              <p className="text-red text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary  text-light py-2 rounded-md hover:bg-green transition font-medium"
            >
              {isSubmitting ? <Loader /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
