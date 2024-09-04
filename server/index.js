import fs from "fs"
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (for form-data)
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/api/auth", authRoutes);

// Start server and connect to DB
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port: ${PORT}`);
});
