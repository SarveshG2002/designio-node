// index.js

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Import the auth.js file
const postsRoutes = require('./routes/posts');
const path = require('path');
const multer = require('multer');

process.env.TZ = 'Asia/Kolkata';

const app = express();
const PORT = 3000;


// Use the routes defined in auth.js
app.use(session({
  secret: 'jhbfsdbjfsdfhsjfvbsjfgvbhjbghvbfgbsdhfgbvusyfgvbhb', // Change this to a strong, secure secret
  resave: false,
  saveUninitialized: false
}));
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/designio', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);
app.use('/auth', authRoutes);
app.use('/post',postsRoutes)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'public', 'view'));

// Define a route for the home page
app.get('/', (req, res) => {
  res.redirect('auth/login');
});



app.use(express.static('public/public'));

// console.log('Declared routes:', listEndpoints(app));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
