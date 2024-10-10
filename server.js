const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database'); // MongoDB connection
const userRoutes = require('./routes/users'); // User-related routes
const productRoutes = require('./routes/productsRouter'); // Product-related routes

const ApiUrl = express();

// Connect to MongoDB
connectDB();

// Use middleware
ApiUrl.use(cors());
ApiUrl.use(express.json({ limit: '50mb' })); // Allows larger payloads for product images

// Define routes
ApiUrl.use('/users', userRoutes); // User-related routes
ApiUrl.use('/products', productRoutes); // Product-related routes

// Start the server
ApiUrl.listen(5001, () => {
  console.log('Your API is running on port 5001');
});
