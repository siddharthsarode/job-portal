import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/user.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.get("/:id", verifyUser, getUserProfile);

// Update the user Profile router
router.put("/:id", verifyUser, updateUserProfile);

export default router;
