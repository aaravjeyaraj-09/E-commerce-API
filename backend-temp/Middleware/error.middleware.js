function errorHandler(err, req, res, next) {

    console.error(err);

// JWT errors
    if (err.name === "JsonWebTokenError") {

        return res.status(401).jsend.fail({
            statusCode: 401,
            result: "fail",
            message: "Invalid token"
        });
    }

// Sequelize validation errors
    if (err.name === "SequelizeValidationError") {

        return res.status(400).jsend.fail({
            statusCode: 400,
            result: "fail",
            message: err.errors.map(e => e.message)
        });
    }

// Default server error
    return res.status(err.status || 500).jsend.error({
        statusCode: err.status || 500,
        result: "error",
        message: err.message || "Internal Server Error"
    });
}

module.exports = errorHandler;