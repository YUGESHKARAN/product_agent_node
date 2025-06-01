const express = require('express');
const router = express.Router();

const {register} = require('../Controller/registerController'); 

router.post('/', register); 

module.exports = router;     