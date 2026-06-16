const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET all brands
router.get('/', async (req, res) => {

try {

    const response = await axios.get(
        `${process.env.API_BASE_URL}/brands`
    );

    const brands = response.data.data.data;

    res.render('brands/index', {
        brands
    });

} catch (error) {

    console.log(error.message);
    console.log(error.response?.data);

    res.render('error');

}


});

// GET create form
router.get('/create', (req, res) => {


res.render('brands/create');


});

// POST create brand
router.post('/create', async (req, res) => {

try {

    const { name } = req.body;

    await axios.post(
        `${process.env.API_BASE_URL}/brands`,
        {
            name
        },
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );

    res.redirect('/brands');

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
        `${process.env.API_BASE_URL}/brands/${req.params.id}`
    );

    const brand = response.data.data.data;

    res.render('brands/edit', {
        brand
    });

} catch (error) {

    console.log(error.message);
  console.log(error.response?.data);

    res.render('error');

}


});

// PUT update brand
router.put('/edit/:id', async (req, res) => {

try {

    const { name } = req.body;

    await axios.put(
        `${process.env.API_BASE_URL}/brands/${req.params.id}`,
        {
            name
        },
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );

    res.redirect('/brands');

} catch (error) {

    console.log(error.message);
      console.log(error.response?.data);

    res.render('error');

}

});

// DELETE brand
router.delete('/delete/:id', async (req, res) => {

try {

    await axios.delete(
        `${process.env.API_BASE_URL}/brands/${req.params.id}`,
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );

    res.redirect('/brands');

} catch (error) {

    console.log(error.message);
      console.log(error.response?.data);

    res.render('error');

}


});

// GET single brand
router.get('/:id', async (req, res) => {

try {

    const response = await axios.get(
        `${process.env.API_BASE_URL}/brands/${req.params.id}`
    );

    const brand = response.data.data.data;

    res.render('brands/show', {
        brand
    });

} catch (error) {

    console.log(error.message);
   console.log(error.response?.data);

    res.render('error');

}

});

module.exports = router;
