const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

const isAuth = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/admin.middleware');

// Get all brands
router.get('/', brandController.getAllBrands);

// Get single brand by id
router.get('/:id', brandController.getBrandById);

// Create a new brand (admin only)
router.post('/', isAuth, isAdmin, brandController.createBrand);

// Update a brand (admin only)
router.put('/:id', isAuth, isAdmin, brandController.updateBrand);

// Delete a brand (admin only)
router.delete('/:id', isAuth, isAdmin, brandController.deleteBrand);

module.exports = router;