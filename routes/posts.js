const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

// router.get('/posts', postController.getAllPosts);
// router.post('/addpost', postController.addNewPost);
// Add other post-related routes as needed

router.post('/addpost',(req,res)=>{
    // console.log('hello1');
    console.log(req);
})

module.exports = router;
