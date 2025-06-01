const express = require('express'); 
// Assuming userData.js is in the same directory
require('dotenv').config(); // Load environment variables from .env file
const {login} = require('../Controller/authController'); // Importing the login function from authController.js

const router = express.Router();    

router.post('/', login);

module.exports = router; // Exporting the router to be used in the main app file