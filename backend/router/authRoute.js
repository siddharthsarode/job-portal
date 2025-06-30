import express from "express";
const router = express.Router();
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userValidationRules } from "../validations/authValidation.js";

router.post("/register", validateSchema(userValidationRules), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/getUser", getUser);

export default router;
