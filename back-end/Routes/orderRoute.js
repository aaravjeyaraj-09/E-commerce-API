const express = require('express');
const router = express.Router();

const orderController = require('../Controllers/orderController');

const isAuth = require('../Middleware/auth.middleware');

// Place an new order
router.post('/place', isAuth, orderController.createOrder);

// Get orders for logged-in user
router.get('/', isAuth, orderController.getOrders);

// Get single order by id for logged-in user
router.get('/:id', isAuth, orderController.getOrderById);

module.exports = router;
