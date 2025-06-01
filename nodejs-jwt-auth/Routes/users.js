const express = require('express'); 
// Assuming userData.js is in the same directory
require('dotenv').config(); // Load environment variables from .env file
const {users} = require('../Controller/usersController') // Importing the login function from authController.js
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();    


router.get('/' ,users);

module.exports = router; // Exporting the router to be used in the main app file