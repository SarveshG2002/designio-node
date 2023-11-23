// auth.js

const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/AuthController');

// Define a route for user login
router.get('/login', (req, res) => {
    const user = req.session.user;
    console.log(req.session.user)
    // console.log(user)
    if (user) {
        // res.sendFile(path.join(__dirname, '../public/view/profile.ejs'));
        // res.send(`Welcome, ${user.username}!`);
        if(user.status=="complete"){

            res.render('home');
        }else{
            res.redirect('profile');
        }
        
    } else {
        res.render('login');
    }
    
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authController.authenticateUser(email, password);

        if (user) {
            // Store user information in the session
            if(user[1]=="complete"){
                req.session.user = {
                    username: user[0].username,
                    email: user[0].email,
                    status : user[1],
                    _id: user[0]._id,
                };
            }else{
                req.session.user = {
                    _id: user[0]._id,
                    status: "profile_pending",
                  };
            }
            

            // Redirect to the user's profile page
            res.redirect('/auth/login');
        } else {
            // Authentication failed
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Define a route for user registration
router.get('/register', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public/view/register.html'));
    res.render('register')
});

router.post('/register', authController.registerUser);

router.get('/profile', (req, res) => {
    const user = req.session.user;
    console.log(req.session.user)
    if (user) {
        // res.sendFile(path.join(__dirname, '../public/view/profile.html'));
        // res.send(`Welcome, ${user.username}!`);
        if(user.status == "profile_pending"){
            res.render('profile', { user: req.session.user,errors: [] });
        }else{
            res.redirect('/auth/login');
        }
       
    } else {
        res.redirect('/auth/login');
    }
    
});

router.post('/update_profile' , authController.updateProfile);

// Add more routes as needed for authentication

module.exports = router;
