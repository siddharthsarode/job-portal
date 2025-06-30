import User from "../models/userModel.js";

// Get user profile by there Id
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Fetched User profile", data: user });
  } catch (err) {
    console.log("Profile fetch error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, mobile } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // checking email or mobile exists or not another user
    const emailExists = await User.findOne({ email, _id: { $ne: id } });
    const mobileExists = await User.findOne({ mobile, _id: { $ne: id } });

    if (emailExists) {
      return res.status(409).json({ message: "Email already in use" });
    }
    if (mobileExists) {
      return res.status(409).json({ message: "Mobile number already in use" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { username, email, mobile },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
