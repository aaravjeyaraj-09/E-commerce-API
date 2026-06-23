const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

const isAuth = require('../middleware/auth.middleware');

// Add to cart
router.post('/add', isAuth, cartController.addToCart);

// Get cart items for logged-in user
router.get('/:id', isAuth, cartController.getCartItems);

// Update cart item quantity
router.put('/update/:id', isAuth, cartController.updateCartItem);

// Remove item from cart
router.delete('/remove/:id', isAuth, cartController.removeCartItem);

// Clear cart for logged-in user
router.delete('/clear', isAuth, cartController.clearCart);

module.exports = router;