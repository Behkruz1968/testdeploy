const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productsController');

// Get all products
router.get('/', getProducts);

// Create a new product
router.post('/', createProduct);

module.exports = router;
