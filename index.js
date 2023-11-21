// index.js

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
const authRoutes = require('./routes/auth'); // Import the auth.js file
const listEndpoints = require('express-list-endpoints');


const app = express();
const PORT = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

// Use the routes defined in auth.js
app.use(session({
  secret: 'jhbfsdbjfsdfhsjfvbsjfgvbhjbghvbfgbsdhfgbvusyfgvbhb', // Change this to a strong, secure secret
  resave: false,
  saveUninitialized: false
}));
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'public', 'view'));


// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'view', 'login.html'));
//   });

// Define a route for the home page
app.get('/', (req, res) => {
  res.redirect('auth/login');
});

// console.log('Declared routes:', listEndpoints(app));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
