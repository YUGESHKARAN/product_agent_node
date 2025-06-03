const express = require('express');
const router = express.Router()
const {sendOtp,resetPassword} = require('../Controller/verifyController');

router.post('/send-otp',sendOtp);
router.post('/reset-password',resetPassword);

module.exports = router