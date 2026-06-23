const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

// Get all memberships
router.get('/', membershipController.getAllMemberships);

module.exports = router;