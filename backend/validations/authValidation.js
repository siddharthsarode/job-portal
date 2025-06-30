import joi from "joi";

export const userValidationRules = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  mobile: joi
    .string()
    .pattern(/^[0-9]{10}$/)
    .required(),

  role: joi.string().valid("admin", "candidate", "employer").required(),
});
