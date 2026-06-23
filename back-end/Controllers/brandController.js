const db = require('../models');

const Brand = db.Brand;

// Get all brands
exports.getAllBrands = async (req, res, next) => {

    try {

        const brands = await Brand.findAll();

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Brands retrieved successfully",
            data: brands
        });

    } catch (error) {

        next(error);

    }

};

// Get single brand by id
exports.getBrandById = async (req, res, next) => {

    try {

        const brand = await Brand.findByPk(req.params.id);

        if (!brand) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Brand not found"
            });

        }

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Brand retrieved successfully",
            data: brand
        });

    } catch (error) {

        next(error);

    }

};

// Create a new brand
exports.createBrand = async (req, res, next) => {

    try {

        const { name } = req.body;

        if (!name) {

            return res.status(400).jsend.fail({
                statusCode: 400,
                result: "fail",
                message: "Name is required"
            });

        }

        const newBrand = await Brand.create({ name });

        return res.status(201).jsend.success({
            statusCode: 201,
            result: "success",
            message: "Brand created successfully",
            data: newBrand
        });

    } catch (error) {

        next(error);

    }

};

// Update brand by id
exports.updateBrand = async (req, res, next) => {

    try {

        const { name } = req.body;

        if (!name) {

            return res.status(400).jsend.fail({
                statusCode: 400,
                result: "fail",
                message: "Name is required"
            });

        }

        const brand = await Brand.findByPk(req.params.id);

        if (!brand) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Brand not found"
            });

        }

        await brand.update({ name });

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Brand updated successfully",
            data: brand
        });

    } catch (error) {

        next(error);

    }

};

// Delete brand by id
exports.deleteBrand = async (req, res, next) => {

    try {

        const brand = await Brand.findByPk(req.params.id);

        if (!brand) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Brand not found"
            });

        }

        await brand.destroy();

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Brand deleted successfully"
        });

    } catch (error) {

        next(error);

    }

};