const db = require('../Models');

const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;

// Add product to cart
exports.addToCart = async (req, res, next) => {

    try {

        const { productId, quantity } = req.body;

        const userId = req.user.id;

        if (!productId || quantity == null) {

            return res.status(400).jsend.fail({
                statusCode: 400,
                result: "fail",
                message: "productId and quantity are required"
            });

        }

        // Find user's cart
        let cart = await Cart.findOne({
            where: { userId }
        });

        // Create cart if not exists
        if (!cart) {

            cart = await Cart.create({
                userId
            });

        }

        // Check if product already exists in cart
        let cartItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                productId
            }
        });

        // If exists, increase quantity
        if (cartItem) {

            cartItem.quantity += quantity;

            await cartItem.save();

        } else {

            // Create new cart item
            cartItem = await CartItem.create({
                cartId: cart.id,
                productId,
                quantity
            });

        }

        return res.status(201).jsend.success({
            statusCode: 201,
            result: "success",
            message: "Product added to cart successfully",
            data: cartItem
        });

    } catch (error) {

        next(error);

    }

};

// Get logged-in user's cart
exports.getCartItems = async (req, res, next) => {

    try {

        const userId = req.user.id;

        // Find cart
        const cart = await Cart.findOne({
            where: { userId }
        });

        if (!cart) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Cart not found"
            });

        }

        // Get cart items
        const cartItems = await CartItem.findAll({
            where: {
                cartId: cart.id
            },
            include: [Product]
        });

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Cart items retrieved successfully",
            data: cartItems
        });

    } catch (error) {

        next(error);

    }

};

// Update cart item quantity
exports.updateCartItem = async (req, res, next) => {

    try {

        const { quantity } = req.body;

        const cartItem = await CartItem.findByPk(req.params.id, {
            include: [Cart]
        });

        if (!cartItem) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Cart item not found"
            });

        }

        // Prevent editing other users' cart items
        if (cartItem.Cart.userId !== req.user.id) {

            return res.status(403).jsend.fail({
                statusCode: 403,
                result: "fail",
                message: "Access denied"
            });

        }

        await cartItem.update({
            quantity
        });

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Cart item updated successfully",
            data: cartItem
        });

    } catch (error) {

        next(error);

    }

};

// Remove item from cart
exports.removeCartItem = async (req, res, next) => {

    try {

        const cartItem = await CartItem.findByPk(req.params.id, {
            include: [Cart]
        });

        if (!cartItem) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Cart item not found"
            });

        }

        // Prevent deleting other users' cart items
        if (cartItem.Cart.userId !== req.user.id) {

            return res.status(403).jsend.fail({
                statusCode: 403,
                result: "fail",
                message: "Access denied"
            });

        }

        await cartItem.destroy();

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Cart item removed successfully"
        });

    } catch (error) {

        next(error);

    }

};

// Clear logged-in user's cart
exports.clearCart = async (req, res, next) => {

    try {

        const userId = req.user.id;

        const cart = await Cart.findOne({
            where: { userId }
        });

        if (!cart) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Cart not found"
            });

        }

        await CartItem.destroy({
            where: {
                cartId: cart.id
            }
        });

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Cart cleared successfully"
        });

    } catch (error) {

        next(error);

    }

};