const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true }
});

module.exports = mongoose.model('products', ProductSchema);
