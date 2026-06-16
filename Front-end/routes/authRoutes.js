const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET login page
router.get('/login', (req, res) => {

res.render('auth/login');

});

// POST login
router.post('/login', async (req, res) => {

try {

   const { username, password } = req.body;

const response = await axios.post(
`${process.env.API_BASE_URL}/auth/login`,
{
username,
password
}
);

    console.log('FULL RESPONSE:', response.data);

    const token =
        response.data.data.data.token;

    console.log('TOKEN:', token);

    req.session.token = token;

    console.log('SESSION:', req.session);

    res.redirect('/products');

} catch (error) {

console.log('AXIOS ERROR:', error);

console.log('ERROR RESPONSE:',
    error.response?.data
);

console.log('ERROR MESSAGE:',
    error.message
);

res.render('auth/login', {
    errorMessage:
        'Invalid username or password'
});

}
});

// GET profile
router.get('/profile', async (req, res) => {

try {

    const response = await axios.get(
        `${process.env.API_BASE_URL}/auth/profile`,
        {
            headers: {
                Authorization:
                    `Bearer ${req.session.token}`
            }
        }
    );

    const user = response.data.data;

    res.render('auth/profile', {
        user
    });

} catch (error) {

    console.log(error.message);

    res.render('error');

}


});

// LOGOUT
router.get('/logout', (req, res) => {

req.session.destroy(() => {

    res.redirect('/auth/login');

});


});

module.exports = router;
