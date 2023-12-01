const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

// router.get('/posts', postController.getAllPosts);
router.post('/addpost', postController.createPost);
// Add other post-related routes as needed

// router.post('/post/addpost',(req,res)=>{
//     console.log('hello1');
// })

module.exports = router;
