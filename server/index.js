const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config(); // Load environment variables from .env
// Connect to database
connectDB();

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
  }),
);

// Routes
app.use("/api/auth", authRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
