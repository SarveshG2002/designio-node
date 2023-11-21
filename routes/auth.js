// auth.js

const express = require('express');
const router = express.Router();
const path = require('path');


// Define a route for user login
router.get('/login', (req, res) => {
    const user = req.session.user;
    // console.log(user)
    if (user) {
        // res.sendFile(path.join(__dirname, '../public/view/profile.ejs'));
        // res.send(`Welcome, ${user.username}!`);
        res.redirect('/auth/pofile');
    } else {
        res.render('login');
    }
    
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Replace with your authentication logic
    const isValidUser = authenticateUser(email, password);

    if (isValidUser) {
        // Store user information in the session
        req.session.user = {
            username: 'example_user',
            email: 'user@example.com'
        };

        // Render the profile page with user data
        // res.render('profile', { user: req.session.user });
        res.redirect('/auth/profile');
    } else {
        res.redirect('/auth/login');
    }
});


// Define a route for user registration
router.get('/register', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public/view/register.html'));
    res.render('register')
});
router.post('/register', (req, res) => {
    res.send("register succces");
});

router.get('/profile', (req, res) => {
    const user = req.session.user;

    if (user) {
        // res.sendFile(path.join(__dirname, '../public/view/profile.html'));
        // res.send(`Welcome, ${user.username}!`);
        res.render('profile', { user: req.session.user });
    } else {
        res.redirect('/auth/login');
    }
    
});

// Add more routes as needed for authentication

module.exports = router;
