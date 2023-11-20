// auth.js

const express = require('express');
const router = express.Router();
const path = require('path');

// Define a route for user login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/view/login.html'));
});

// Define a route for user registration
// router.get('/register', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'view', 'register.html'));
// });

// Add more routes as needed for authentication

module.exports = router;
