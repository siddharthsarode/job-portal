export const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const errorsArr = error.details.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));
    return res
      .status(400)
      .json({ success: false, message: "User validation fails", errorsArr });
  }

  next();
};
