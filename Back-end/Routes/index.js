var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   return res.status(200).jsend.success({
    message: "API is running"
  });
});

module.exports = router;