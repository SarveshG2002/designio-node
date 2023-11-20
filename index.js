// index.js

const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth'); // Import the auth.js file
const listEndpoints = require('express-list-endpoints');


const app = express();
const PORT = 3000;

// Use the routes defined in auth.js
app.use('/auth', authRoutes);
// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'view', 'login.html'));
//   });

// Define a route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view', 'login.html'));
});

// console.log('Declared routes:', listEndpoints(app));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
