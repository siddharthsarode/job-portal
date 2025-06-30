import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token || "";

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;

    console.log(user);

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
