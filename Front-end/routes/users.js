var express = require('express');
var router = express.Router();

const axios = require('axios');

// GET all users 
router.get('/', async (req, res) => {

    try {

        const response = await axios.get(
            `${process.env.API_BASE_URL}/auth`,
            {
                headers: {
                    Authorization:
                        `Bearer ${req.session.token}`
                }
            }
        );

        const users =
            response.data.data.data;

        res.render('users/index', {
            users
        });

    } catch (error) {

        console.log(error.message);

        console.log(error.response?.data);

        res.render('error');

    }

});


// GET register page
router.get('/register', (req, res) => {

    res.render('users/register');

});


// POST register new user
router.post('/register', async (req, res) => {

    try {

        const {
            firstname,
            lastname,
            username,
            email,
            password,
            address,
            city,
            telephone
        } = req.body;

        const response = await axios.post(
            `${process.env.API_BASE_URL}/auth/register`,
            {
                firstname,
                lastname,
                username,
                email,
                password,
                address,
                city,
                telephone
            }
        );

        console.log('FULL RESPONSE:', response.data);

        res.redirect('/users');

    } catch (error) {

        console.log(error.message);

        console.log(error.response?.data);

        res.render('users/register', {
            errorMessage:
                'Registration failed. Please try again.'
        });

    }

});

module.exports = router;
