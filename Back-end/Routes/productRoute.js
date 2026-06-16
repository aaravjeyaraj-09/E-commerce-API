const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const searchController = require('../controllers/searchController');

const isAuth = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/admin.middleware');

// Get all products
router.get('/', productController.getAllProducts);

// search products by name
router.get('/search', searchController.searchProducts);

// Get single product by id
router.get('/:id', productController.getProductById);

// Create a new product (admin only)
router.post('/', isAuth, isAdmin, productController.createProduct);

// Update a product (admin only)
router.put('/:id', isAuth, isAdmin, productController.updateProduct);

// Delete a product (admin only)
router.delete('/:id', isAuth, isAdmin, productController.deleteProduct);

module.exports = router;