import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_BASE_URL}/user/${user.id}`,
          { credentials: "include" }
        );
        const result = await res.json();
        if (!res.ok)
          throw new Error(result.message || "Failed to fetch profile");

        setProfile(result.data);
        reset(result.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchProfile();
  }, [user?.id, reset]);

  const onSubmit = async (formData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/user/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update failed");

      setProfile(result.user);
      reset(result.user); // update form data
      setIsEditing(false);
      toast.success(result.message || "Updated successfully");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      console.log(err);
    }
  };

  const handleCancel = () => {
    reset(profile);
    setIsEditing(false);
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="w-full">
      <h2 className="text-primary font-bold text-2xl mb-7">My Profile</h2>
      <div className="max-w-xl p-6 rounded-lg mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-dark mb-1">Username</label>
            <input
              type="text"
              readOnly={!isEditing}
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className={`w-full px-4 py-2  rounded-md focus:outline-none text-dark ${
                isEditing ? "focus:ring-2 focus:ring-primary" : "bg-gray-100"
              }`}
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
              readOnly={!isEditing}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              className={`w-full px-4 py-2  rounded-md focus:outline-none text-dark ${
                isEditing ? "focus:ring-2 focus:ring-primary" : "bg-gray-100"
              }`}
            />
            {errors.email && (
              <p className="text-red text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-dark mb-1">Mobile</label>
            <input
              type="tel"
              readOnly={!isEditing}
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Mobile number must be 10 digits",
                },
              })}
              className={`w-full px-4 py-2  rounded-md focus:outline-none text-dark ${
                isEditing ? "focus:ring-2 focus:ring-primary" : "bg-gray-100"
              }`}
            />
            {errors.mobile && (
              <p className="text-red text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>

          {/* Buttons */}
          {isEditing && (
            <div className="pt-4 flex items-center gap-4">
              <button
                type="submit"
                className="bg-primary text-light py-2 px-6 rounded-md hover:bg-green transition font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader /> : "Save"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-dark py-2 px-6 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
        <div className="flex justify-between items-center my-7">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
