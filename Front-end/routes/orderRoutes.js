const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET create order page
router.get('/create', (req, res) => {

    res.render('orders/create');

});


// CREATE new order
router.post('/place', async (req, res) => {

try {

    const {
        orderName,
        totalAmount,
        membershipName,
        membershipDiscount,
        status
    } = req.body;

    await axios.post(
            `${process.env.API_BASE_URL}/orders/place`,
        {
            orderName,
            totalAmount,
            membershipName,
            membershipDiscount,
            status
        },
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );

    res.redirect('/orders');

} catch (error) {

    console.log(error.message);
    console.log(error.response?.data);

    res.render('error');

}


});


// GET single order details
 
router.get('/:id', async (req, res) => {

try {

    const response = await axios.get(
        `${process.env.API_BASE_URL}/orders/detail/${req.params.id}`,
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );
        const order = response.data.data.data;

    res.render('orders/show', {
        order
    });

} catch (error) {

    console.log(error.message);
    console.log(error.response?.data);

    res.render('error');

}


});

// GET all orders
router.get('/', async (req, res) => {


try {

    const response = await axios.get(
        `${process.env.API_BASE_URL}/orders`,
        {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        }
    );

    const orders = response.data.data.data;

    res.render('orders/index', {
            orders
    });

} catch (error) {

    console.log(error.message);
    console.log(error.response?.data);

    res.render('error');

}


});

module.exports = router;
