const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db'); // Import the database connection
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware (e.g., body-parser, cors, etc. can be added here)
app.use(express.json()); // For parsing JSON request bodies
app.use(cors());
// Connect to MongoDB
connectDB();

// Define routes (example)
app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
