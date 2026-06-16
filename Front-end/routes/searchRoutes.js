const express = require('express');
const router = express.Router();
const axios = require('axios');

// SEARCH PRODUCTS BY NAME
router.get('/', async (req, res) => {

try {

    const { query } = req.query;

    // Prevent empty search
    if (!query) {

        return res.redirect('/products');

    }

    const response = await axios.get(
        `${process.env.API_BASE_URL}/search?query=${encodeURIComponent(query)}`
    );

    const products = response.data.data.data;

    res.render('products/index', {
        products,
        query
    });

} catch (error) {

    console.log(error.response?.data);
    console.log(error.message);

    res.render('error');

}

});

// SEARCH PRODUCTS BY CATEGORY
router.get('/category/:categoryId', async (req, res) => {

try {

    const { categoryId } = req.params;

    const response = await axios.get(
        `${process.env.API_BASE_URL}/categories/${categoryId}/products`
    );

    const products = response.data.data.data;

    res.render('products/index', {
        products,
        query: `Category: ${categoryId}`
    });

} catch (error) {

    console.log(error.response?.data);
    console.log(error.message);

    res.render('error');

}

});

// SEARCH PRODUCTS BY BRAND
router.get('/brand/:brandId', async (req, res) => {

try {

    const { brandId } = req.params;

    const response = await axios.get(
        `${process.env.API_BASE_URL}/brands/${brandId}/products`
    );

    const products = response.data.data.data;

    res.render('products/index', {
        products,
        query: `Brand: ${brandId}`
    });

} catch (error) {

    console.log(error.response?.data);
    console.log(error.message);

    res.render('error');

}

});

module.exports = router;
