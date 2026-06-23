const db = require('../Models');

const Order = db.Order;

// Create new order
exports.createOrder = async (req, res, next) => {

    try {

        const {
            orderName,
            totalAmount,
            membershipName,
            membershipDiscount,
            status
        } = req.body;

        const userId = req.user.id;

        if (!orderName || totalAmount == null) {

            return res.status(400).jsend.fail({
                statusCode: 400,
                result: "fail",
                message: "orderName and totalAmount are required"
            });

        }
        const orderNumber = `ORD-${Date.now()}`;
        
        const newOrder = await Order.create({
            userId,
            orderName,
            orderNumber, 
            totalAmount,
            membershipName,
            membershipDiscount,
            status
        });

        return res.status(201).jsend.success({
            statusCode: 201,
            result: "success",
            message: "Order created successfully",
            data: newOrder
        });

    } catch (error) {

        next(error);

    }

};

// Get orders for logged-in user
exports.getOrders = async (req, res, next) => {

    try {

        const userId = req.user.id;

        const orders = await Order.findAll({
            where: { userId }
        });

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Orders retrieved successfully",
            data: orders
        });

    } catch (error) {

        next(error);

    }

};

// Get single order by id
exports.getOrderById = async (req, res, next) => {

    try {

        const userId = req.user.id;

        const orderId = req.params.id;

        const orderData = await Order.findOne({
            where: {
                id: orderId,
                userId
            }
        });

        if (!orderData) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Order not found"
            });

        }

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Order retrieved successfully",
            data: orderData
        });

    } catch (error) {

        next(error);

    }

};