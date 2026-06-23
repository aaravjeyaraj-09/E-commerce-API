const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const db = require("../models");

const User = db.User;

// Register user
exports.register = async (req, res, next) => {

    try {

        const {firstname,lastname,username,email,password,address,city,telephone} = req.body;

// Check existing user
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {

            return res.status(400).jsend.fail({
                statusCode: 400,
                result: "fail",
                message: "Email or username already exists"
            });

        }

// Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

// Create user
        const newUser = await User.create({firstname,lastname,username,email,password: hashedPassword,address,city,telephone,roleId: 2,membershipId: 1});

        return res.status(201).jsend.success({
            statusCode: 201,
            result: "success",
            message: "User registered successfully",
            data: {
                id: newUser.id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username,
                email: newUser.email,
                membershipId: newUser.membershipId
            }
        });

    } catch (error) {

        next(error);

    }

};

// Login user
exports.login = async (req, res, next) => {

    try {

        const {email,username,password} = req.body;

// Find user by email OR username
        const user = await User.findOne({
            where: {
                username
     }
});


// Invalid user
        if (!user) {

            return res.status(401).jsend.fail({
                statusCode: 401,
                result: "fail",
                message: "Invalid credentials"
            });

        }

// Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

// Invalid password
        if (!isPasswordValid) {

            return res.status(401).jsend.fail({
                statusCode: 401,
                result: "fail",
                message: "Invalid credentials"
            });

        }

// Generate token

console.log(user);
console.log(user.roleId);

        const token = jwt.sign(
            {
                id: user.id,
                roleId: user.roleId,
                email: user.email
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "2h"
            }
        );

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Login successful",
            data: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                roleId: user.roleId,
                membershipId: user.membershipId,
                token
            }
        });

    } catch (error) {

        next(error);

    }

};

// Get user profile
exports.getProfile = async (req, res, next) => {

    try {

        const user = await User.findByPk(req.user.id, {
            attributes: {
                exclude: ['password']
            }
        });

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            data: user
        });

    } catch (error) {

        next(error);

    }

};

// Admin test route
exports.adminRoute = async (req, res, next) => {

    try {

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Admin route works"
        });

    } catch (error) {

        next(error);

    }

};

// Get all users
exports.getAllUsers = async (req, res, next) => {

    try {

        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Users retrieved successfully",
            data: users
        });

    } catch (error) {

        next(error);

    }

};
