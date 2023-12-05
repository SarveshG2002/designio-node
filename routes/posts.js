const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

const storage =  multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'Images')
    },
    filename: (req,file,cb)=>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });
// router.get('/posts', postController.getAllPosts);
// router.post('/addpost',upload.single('postImage'), postController.addNewPost);
// Add other post-related routes as needed
router.post('/addpost',upload.single('postImage'), (req,res)=>{
    console.log(req.body);
    console.log(req.file);
});


module.exports = router;
