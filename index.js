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
// const storage =  multer.diskStorage({
//   destination: (req,file,cb)=>{
//       cb(null,'Images')
//   },
//   filename: (req,file,cb)=>{
//       console.log(file);
//       cb(null,Date.now()+path.extname(file.originalname));
//   }
// })


// const upload = multer({storage:storage})
// app.use(bodyParser.urlencoded({ extended: true }));

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


// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'view', 'login.html'));
//   });

// Define a route for the home page
app.get('/', (req, res) => {
  res.redirect('auth/login');
});

// app.get('/testhtml',(req,res)=>{
//   res.render('test',{'hello':'get','data':req.body});
// });

// app.post('/upload',upload.single('postImage'),(req,res)=>{
//   res.send("Image Uploaded");
// });

// app.post('/test',(req,res)=>{
//   console.log(req.body);
// });

app.use(express.static('public/public'));

// console.log('Declared routes:', listEndpoints(app));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
