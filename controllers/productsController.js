const Product = require('../models/product');

// Controller function to create a product
const createProduct = async (req, res) => {
  const { imageUrl, name, description, author } = req.body;

  if (!imageUrl || !name || !description || !author) {
    return res.status(400).json({ message: 'Bad Request: Missing data' });
  }

  try {
    const newProduct = new Product({
      imageUrl,
      name,
      description,
      author,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', data: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Unable to create product' });
  }
};

// Controller function to get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Unable to fetch products' });
  }
};

module.exports = { createProduct, getProducts };
