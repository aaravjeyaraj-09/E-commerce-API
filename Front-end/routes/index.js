const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {

// If logged in
if (req.session.token) {

    return res.redirect('/products');

}

// If not logged in
res.redirect('/auth/login');

});

module.exports = router;