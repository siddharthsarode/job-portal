import { useForm } from "react-hook-form";
import { FaUserTie, FaUserGraduate } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      mobile: "",
      role: "candidate",
    },
  });

  const onSubmit = async (data) => {
    const url = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000";
    try {
      const res = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration Failed!");
      }
      toast.success("Registration successful");
      reset();
      setUser(result.user);
      switch (result.user.role) {
        case "candidate":
          navigate("/jobs");
          break;
        case "employer":
          navigate("/employer");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Registration failed. Please try again.");
    }
  };

  const selectedRole = watch("role");

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-dark mb-1">Username</label>
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-dark"
            />
            {errors.username && (
              <p className="text-red text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-dark mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-dark"
            />
            {errors.password && (
              <p className="text-red text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-dark mb-1">Mobile</label>
            <input
              type="tel"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Mobile number must be 10 digits",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-dark"
            />
            {errors.mobile && (
              <p className="text-red text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-dark mb-2 font-medium">
              What describes you best?
            </label>
            <div className="flex gap-6">
              <label
                className={`flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer transition ${
                  selectedRole === "candidate"
                    ? "bg-primary text-light"
                    : "bg-ternary text-dark hover:bg-primary hover:text-light"
                }`}
                onClick={() => setValue("role", "candidate")}
              >
                <FaUserGraduate />
                Candidate
              </label>

              <label
                className={`flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer transition ${
                  selectedRole === "employer"
                    ? "bg-primary text-light"
                    : "bg-ternary text-dark hover:bg-primary hover:text-light"
                }`}
                onClick={() => setValue("role", "employer")}
              >
                <FaUserTie />
                Employer
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary  text-light py-2 rounded-md hover:bg-green transition font-medium"
            >
              {isSubmitting ? <Loader /> : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
