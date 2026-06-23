function validateRegister(req, res, next) {

    const {firstname,lastname,username,email,password,address,city,telephone} = req.body;

// Required fields
    if (!firstname ||!lastname ||!username ||!email ||!password ||!address ||!city ||!telephone) {
        return res.status(400).jsend.fail({
            statusCode: 400,
            result: "fail",
            message: "All fields are required"
        });
    }

// String validation
    if (typeof firstname !== "string" ||typeof lastname !== "string" ||typeof username !== "string") {
        return res.status(400).jsend.fail({
            statusCode: 400,
            result: "fail",
            message: "Firstname, lastname and username must be strings"
        });
    }

// Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).jsend.fail({
            statusCode: 400,
            result: "fail",
            message: "Invalid email format"
        });
    }

// Password validation
    if (password.length < 6) {
        return res.status(400).jsend.fail({
            statusCode: 400,
            result: "fail",
            message: "Password must be at least 6 characters long"
        });
    }

    next();
}

function validateLogin(req, res, next) {

    const { email, username, password } = req.body;

// Require either email or username
    if ((!email && !username) || !password) {

        return res.status(400).jsend.fail({
            statusCode: 400,
            result: "fail",
            message: "Email or username and password are required"
        });
    }

    next();
}

function validateProductCreation(req, res, next) {

    const {name,price,stock,categoryId,brandId} = req.body;

// Required fields
    if (!name ||price === undefined ||stock === undefined ||!categoryId ||!brandId) {

        return res.status(400).jsend.fail({
            statusCode: 400,
            result: "fail",
            message: "Missing required product fields"
        });
    }

// Price validation
    if (isNaN(price) || Number(price) < 0) {

        return res.status(400).jsend.fail({
            statusCode: 400,
            result: "fail",
            message: "Price must be a non-negative number"
        });
    }

// Stock validation
    if (isNaN(stock) || Number(stock) < 0) {

        return res.status(400).jsend.fail({
            statusCode: 400,
            result: "fail",
            message: "Stock must be a non-negative number"
        });
    }

    next();
}

module.exports = {validateRegister,validateLogin,validateProductCreation};