import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { dbConfig } from "./config/dbConfig.js";
import authRouter from "./routes/authRoute.js";
import candidateRoute from "./routes/candidateRoute.js";
import employeeRoute from "./routes/employeeRoute.js";

import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8080;

dbConfig();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/upload", express.static("uploads"));

app.use("/auth", authRouter);
app.use("/employee", employeeRoute);
app.use("/candidate", candidateRoute);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
