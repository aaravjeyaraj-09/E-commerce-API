const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

const isAuth = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/admin.middleware');

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get single category by id
router.get('/:id', categoryController.getCategoryById);

// Create a new category (admin only)
router.post('/', isAuth, isAdmin, categoryController.createCategory);

// Update a category (admin only)
router.put('/:id', isAuth, isAdmin, categoryController.updateCategory);

// Delete a category (admin only)
router.delete('/:id', isAuth, isAdmin, categoryController.deleteCategory);

module.exports = router;