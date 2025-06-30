import joi from "joi";
import mongoose, { mongo } from "mongoose";

const validateObjectId = (value, helpers) => {
  console.log("object id", value);
  console.log("helper", helpers);
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }

  return value;
};

export const jobPostValidationSchema = joi.object({
  employerId: joi.string().custom(validateObjectId).required(),
  title: joi.string().trim().min(3).max(100).required(),
  description: joi.string().trim().min(10).required(),
  position: joi.string().min(2).max(100).required(),
  location: joi.string().trim().min(2).required(),
  jobType: joi
    .string()
    .valid("full-time", "part-time", "internship", "remote")
    .required(),
  experienceLevel: joi
    .string()
    .valid("fresher", "junior", "mid", "senior", "lead", "any")
    .required(),
  isActive: joi.boolean().optional(),
});
