const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

router.get('/posts', postController.getAllPosts);
router.post('/posts', postController.createPost);
// Add other post-related routes as needed

module.exports = router;
