const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET all products
router.get('/', async (req, res) => {

try {

    const response = await axios.get(
        `${process.env.API_BASE_URL}/products`
    );

    const products = response.data.data.data;

    res.render('products/index', {
        products
    });

} catch (error) {
console.log(error.response?.data);

console.log(error.message);

res.render('error');

}
});

// GET create product form
router.get('/create', (req, res) => {


res.render('products/create');


});

// POST create product
router.post('/create', async (req, res) => {

try {

    const {
        name,
        description,
        price,
        stock,
        brandId,
        categoryId
    } = req.body;

    await axios.post(
        `${process.env.API_BASE_URL}/products`,
        {
            name,
            description,
            price,
            stock,
            brandId,
            categoryId
        },
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );

    res.redirect('/products');

} catch (error) {
console.log(error.response?.data);

console.log(error.message);

res.render('error');
}
});


// GET edit product form
router.get('/edit/:id', async (req, res) => {


try {

    const response = await axios.get(
        `${process.env.API_BASE_URL}/products/${req.params.id}`
    );

    const product = response.data.data.data;

    res.render('products/edit', {
        product
    });

} catch (error) {

    console.log(error.response?.data);

    console.log(error.message);

    res.render('error');

}


});

// PUT update product
router.put('/edit/:id', async (req, res) => {


try {

    const {
        name,
        description,
        price,
        stock,
        brandId,
        categoryId
    } = req.body;

    await axios.put(
        `${process.env.API_BASE_URL}/products/${req.params.id}`,
        {
            name,
            description,
            price,
            stock,
            brandId,
            categoryId
        },
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );

    res.redirect('/products');

} catch (error) {

    console.log(error.response?.data);

    console.log(error.message);

    res.render('error');

}


});

// DELETE product
router.delete('/delete/:id', async (req, res) => {


try {

    await axios.delete(
        `${process.env.API_BASE_URL}/products/${req.params.id}`,
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );

    res.redirect('/products');

} catch (error) {

    console.log(error.response?.data);

    console.log(error.message);

    res.render('error');

}


});

// GET single product
router.get('/:id', async (req, res) => {

try {

    const response = await axios.get(
        `${process.env.API_BASE_URL}/products/${req.params.id}`
    );

    const product = response.data.data.data;

    res.render('products/show', {
        product
    });

} catch (error) {

    console.log(error.response?.data);

    console.log(error.message);

    res.render('error');

}

});

module.exports = router;
