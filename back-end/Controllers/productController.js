const db = require('../Models');

const Product = db.Product;
const Brand = db.Brand;
const Category = db.Category;

// Get all products
exports.getAllProducts = async (req, res, next) => {

    try {

        const products = await Product.findAll({
            include: [ Brand,Category]
        });

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Products retrieved successfully",
            data: products
        });

    } catch (error) {

        next(error);

    }

};

// Get single product by id
exports.getProductById = async (req, res, next) => {

    try {

        const product = await Product.findByPk(req.params.id, {
            include: [ Brand,Category ]
        });

        if (!product) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Product not found"
            });

        }

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Product retrieved successfully",
            data: product
        });

    } catch (error) {

        next(error);

    }

};

// Create new product
exports.createProduct = async (req, res, next) => {

    try {

        const {name,price,description,stock,brandId,categoryId} = req.body;

        if (!name || price == null || stock == null) {

            return res.status(400).jsend.fail({
                statusCode: 400,
                result: "fail",
                message: "Missing required fields"
            });

        }

        const newProduct = await Product.create({
            name,
            price,
            description,
            stock,
            brandId,
            categoryId
        });

        return res.status(201).jsend.success({
            statusCode: 201,
            result: "success",
            message: "Product created successfully",
            data: newProduct
        });

    } catch (error) {

        next(error);

    }

};

// Update product by id
exports.updateProduct = async (req, res, next) => {

    try {

        const product = await Product.findByPk(req.params.id);

        if (!product) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Product not found"
            });

        }

        await product.update(req.body);

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {

        next(error);

    }

};

// Delete product by id
exports.deleteProduct = async (req, res, next) => {

    try {

        const product = await Product.findByPk(req.params.id);

        if (!product) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Product not found"
            });

        }

        await product.destroy();

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Product deleted successfully"
        });

    } catch (error) {

        next(error);

    }

};