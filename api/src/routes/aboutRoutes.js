const express = require('express');
const router = express.Router();
const { handleAboutForm } = require('../controller/aboutController');

router.post('/', handleAboutForm);

module.exports = router;
