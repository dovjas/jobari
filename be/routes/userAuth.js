const express = require('express');
const router = express.Router();
const userControll = require('../controllers/userAuthController');

router.post('/createUser', userControll.createUser);

module.exports = router;