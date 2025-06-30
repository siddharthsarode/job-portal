import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register users controller
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, mobile, role } = req.body;

    // check user exist or not
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashPassword,
      mobile,
      role,
    });

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Handle user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields Required!" });
    }

    // check user exist or not
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }

    const passMatched = await bcrypt.compare(password, existingUser.password);

    if (!passMatched)
      return res.status(403).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        message: "User Login successfully",
        user: {
          id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
          role: existingUser.role,
        },
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get logged in user verifying token

export const getUser = async (req, res) => {
  try {
    const token = req.cookies.token || "";
    if (!token) return res.status(401).json({ message: "Unauthorized!" });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ user, message: "User Authenticated!" });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Invalid token", user: null });
  }
};

// logout route
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });
  return res.status(200).json({ message: "Logout successfully" });
};
