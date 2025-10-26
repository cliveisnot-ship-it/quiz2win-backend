// Load environment variables
require('dotenv').config();

console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB error:', err);
});

// Sample route to test form submission
app.post('/register', (req, res) => {
  console.log('Form data:', req.body);
  res.send('Received!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});