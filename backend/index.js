import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./router/authRoute.js";
import jobRouter from "./router/jobPostRoute.js";
import userRouter from "./router/userRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: [
      "https://job-portal-ome5.onrender.com",
      "https://job-portal-frontend-virk.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>Hello Siddharth, You are done it.</h1>");
});

app.use("/auth", authRouter);
app.use("/jobPost", jobRouter);
app.use("/user", userRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on ${PORT} port.`);
});
