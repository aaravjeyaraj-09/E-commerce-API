const db = require('../Models');

const Category = db.Category;

// Get all categories
exports.getAllCategories = async (req, res, next) => {

    try {

        const categories = await Category.findAll();

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Categories retrieved successfully",
            data: categories
        });

    } catch (error) {

        next(error);

    }

};

// Get single category by id
exports.getCategoryById = async (req, res, next) => {

    try {

        const category = await Category.findByPk(req.params.id);

        if (!category) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Category not found"
            });

        }

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Category retrieved successfully",
            data: category
        });

    } catch (error) {

        next(error);

    }

};

// Create new category
exports.createCategory = async (req, res, next) => {

    try {

        const { name } = req.body;

        if (!name) {

            return res.status(400).jsend.fail({
                statusCode: 400,
                result: "fail",
                message: "Name is required"
            });

        }

        const category = await Category.create({ name });

        return res.status(201).jsend.success({
            statusCode: 201,
            result: "success",
            message: "Category created successfully",
            data: category
        });

    } catch (error) {

        next(error);

    }

};

// Update category by id
exports.updateCategory = async (req, res, next) => {

    try {

        const { name } = req.body;

        if (!name) {

            return res.status(400).jsend.fail({
                statusCode: 400,
                result: "fail",
                message: "Name is required"
            });

        }

        const category = await Category.findByPk(req.params.id);

        if (!category) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Category not found"
            });

        }

        await category.update({ name });

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Category updated successfully",
            data: category
        });

    } catch (error) {

        next(error);

    }

};

// Delete category by id
exports.deleteCategory = async (req, res, next) => {

    try {

        const category = await Category.findByPk(req.params.id);

        if (!category) {

            return res.status(404).jsend.fail({
                statusCode: 404,
                result: "fail",
                message: "Category not found"
            });

        }

        await category.destroy();

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Category deleted successfully"
        });

    } catch (error) {

        next(error);

    }

};