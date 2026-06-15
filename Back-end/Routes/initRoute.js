const express = require("express");
const router = express.Router();

const initController = require("../Controllers/initController");

router.post("/", initController.initializeDatabase);

module.exports = router;