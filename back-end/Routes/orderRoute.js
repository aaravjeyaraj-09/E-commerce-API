const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

const isAuth = require('../middleware/auth.middleware');

// Place an new order
router.post('/place', isAuth, orderController.createOrder);

// Get orders for logged-in user
router.get('/', isAuth, orderController.getOrders);

// Get single order by id for logged-in user
router.get('/:id', isAuth, orderController.getOrderById);

module.exports = router;
