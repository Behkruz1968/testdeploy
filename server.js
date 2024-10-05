// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/users');

const ApiUrl = express();

// Connect to MongoDB
connectDB();

// Use middleware
ApiUrl.use(cors());
ApiUrl.use(express.json());

// Define your routes
ApiUrl.use('/users', userRoutes);

// Define the server globally
global.server = ApiUrl.listen(5001, () => {
    console.log('Your API is running globally on port 5001');
});
