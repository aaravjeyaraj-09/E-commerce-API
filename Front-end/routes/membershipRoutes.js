const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET all memberships
router.get('/', async (req, res) => {
   
    console.log('FRONTEND MEMBERSHIP ROUTE HIT');
    
    try {

        const response = await axios.get(
            `${process.env.API_BASE_URL}/memberships`
        );

        const memberships =
            response.data.data.data;

        res.render('memberships/index', {
            memberships
        });

    } catch (error) {

        console.log(error.message);

        console.log(error.response?.status);

        console.log(error.response?.data);

        res.render('error');

    }

});

module.exports = router;