// auth.js

const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/AuthController');

// Define a route for user login
router.get('/login', (req, res) => {
    const user = req.session.user;
    // console.log(req.session.user)
    // console.log(user)
    if (user) {
        if(user.status=="complete"){

            res.redirect('/auth/home');
        }else{
            res.redirect('profile');
        }
        
    } else {
        res.render('login');
    }
    
});

router.get('/home', (req, res) => {
    const user = req.session.user;
    // console.log(req.session.user)
    // console.log(user)
    if (user) {
        if(user.status=="complete"){

            res.render('home',{'session':user});
        }else{
            res.redirect('profile');
        }
        
    } else {
        res.render('login');
    }
    
});

router.get('/explore', (req, res) => {
    const user = req.session.user;
    if (user) {
        if(user.status=="complete"){

            res.render('explore',{'session':user});
        }else{
            res.redirect('profile');
        }
        
    } else {
        res.render('login');
    }
});

router.get('/friends', async (req, res) => {
    const user = req.session.user;
    
    if (user) {
        if (user.status === "complete") {
            try {
                // Use await to properly handle the asynchronous function getAllUser
                const friends = await authController.getFollowedUsers(req);
                console.log(friends);
                // Render the friends template with the user session and friends data
                res.render('friends', { session: user, friends: friends });
            } catch (error) {
                console.error('Error fetching friends:', error);
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.redirect('profile');
        }
    } else {
        res.render('login');
    }
});
router.get('/group', (req, res) => {
    const user = req.session.user;
    if (user) {
        if(user.status=="complete"){

            res.render('group',{'session':user});
        }else{
            res.redirect('profile');
        }
        
    } else {
        res.render('login');
    }
});
router.get('/setting', (req, res) => {
    const user = req.session.user;
    if (user) {
        if(user.status=="complete"){

            res.render('setting',{'session':user});
        }else{
            res.redirect('profile');
        }
        
    } else {
        res.render('login');
    }
});
router.get('/trending', (req, res) => {
    const user = req.session.user;
    if (user) {
        if(user.status=="complete"){

            res.render('trending',{'session':user});
        }else{
            res.redirect('profile');
        }
        
    } else {
        res.render('login');
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // console.log('body',req.body);

    try {
        const user = await authController.authenticateUser(email, password);

        if (user) {
            // Store user information in the session
            if(user[1]=="complete"){
                req.session.user = {
                    username: user[2].username,
                    email: user[0].email,
                    status : user[1],
                    name : user[0].name,
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
        // console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/logout', (req, res) => {
    // Use the authentication controller's logout function to clear the session
    req.session.destroy();

    // Redirect to the home page or any other desired page after logout
    res.redirect('/');
});

// Define a route for user registration
router.get('/register', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public/view/register.html'));
    res.render('register')
});

router.post('/register', authController.registerUser);

router.get('/profile', (req, res) => {
    const user = req.session.user;
    // console.log(req.session.user)
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
