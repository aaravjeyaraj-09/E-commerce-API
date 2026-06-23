const jwt = require('jsonwebtoken');

function isAuth(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).jsend.fail({
            statusCode: 401,
            result: "fail",
            message: 'Invalid token format',
        });
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).jsend.fail({
            statusCode: 401,
            result: "fail",
            message: 'Invalid or expired token',
        });
    }
}

module.exports = isAuth;