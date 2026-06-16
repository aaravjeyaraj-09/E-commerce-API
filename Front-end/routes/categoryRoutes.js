const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET all categories
router.get('/', async (req, res) => {


try {

    const response = await axios.get(
        `${process.env.API_BASE_URL}/categories`
    );

    const categories = response.data.data.data;

    res.render('categories/index', {
        categories
    });

} catch (error) {

    console.log(error.message);
    console.log(error.response?.data);

    res.render('error');

}


});

// GET create form
router.get('/create', (req, res) => {


res.render('categories/create');


});

// POST create category
router.post('/create', async (req, res) => {

try {

    const {
        name,
        description
    } = req.body;

    await axios.post(
        `${process.env.API_BASE_URL}/categories`,
        {
            name,
            description
        },
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );

    res.redirect('/categories');

} catch (error) {

    console.log(error.message);
        console.log(error.response?.data);
    res.render('error');

}


});

// GET edit form
router.get('/edit/:id', async (req, res) => {

try {

    const response = await axios.get(
        `${process.env.API_BASE_URL}/categories/${req.params.id}`
    );

    const category = response.data.data.data;

    res.render('categories/edit', {
        category
    });

} catch (error) {

    console.log(error.message);
    console.log(error.response?.data);
    res.render('error');

}


});

// PUT update category
router.put('/edit/:id', async (req, res) => {

try {

    const {
        name,
        description
    } = req.body;

    await axios.put(
        `${process.env.API_BASE_URL}/categories/${req.params.id}`,
        {
            name,
            description
        },
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );

    res.redirect('/categories');

} catch (error) {

    console.log(error.message);
    console.log(error.response?.data);
    res.render('error');

}


});

// DELETE category
router.delete('/delete/:id', async (req, res) => {


try {

    await axios.delete(
        `${process.env.API_BASE_URL}/categories/${req.params.id}`,
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );

    res.redirect('/categories');

} catch (error) {

    console.log(error.message);
    console.log(error.response?.data);
    res.render('error');

}


});

// GET single category
router.get('/:id', async (req, res) => {


try {

    const response = await axios.get(
        `${process.env.API_BASE_URL}/categories/${req.params.id}`
    );

    const category = response.data.data.data;

    res.render('categories/show', {
        category
    });

} catch (error) {

    console.log(error.message);
    console.log(error.response?.data);

    res.render('error');

}
});

module.exports = router;