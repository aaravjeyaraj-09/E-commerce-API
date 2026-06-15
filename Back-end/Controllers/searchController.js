const db = require('../models');

const Product = db.Product;
const Brand = db.Brand;
const Category = db.Category;

const { Op } = require('sequelize');

// Search products by name
exports.searchProducts = async (req, res, next) => {

    try {

        const { query } = req.query;

        if (!query) {

            return res.status(400).jsend.fail({
                statusCode: 400,
                result: "fail",
                message: "Query parameter is required"
            });

        }

        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${query}%`
                }
            },
            include: [
                {
                    model: Brand,
                    attributes: ['id', 'name']
                },
                {
                    model: Category,
                    attributes: ['id', 'name']
                }
            ]
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