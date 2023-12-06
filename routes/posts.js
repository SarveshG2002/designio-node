const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

const storage =  multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/public/uploads/posts')
    },
    filename: (req,file,cb)=>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });
router.post('/addpost',upload.single('postImage'), postController.addNewPost);



module.exports = router;
