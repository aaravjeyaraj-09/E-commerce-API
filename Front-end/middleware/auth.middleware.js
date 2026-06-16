function authMiddleware(req, res, next) {

// Check if user is logged in
if (!req.session.token) {

    return res.redirect('/auth/login');
}

next();

}
module.exports = authMiddleware;