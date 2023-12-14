const Post = require('../models/Post'); // Make sure to adjust the path based on your project structure
const Friend = require('../models/Friend.js'); 
const mongoose = require('mongoose');
const fs = require('fs').promises;

async function getAllPostByUser(userId) {
    try {
      const result = await Friend.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(userId)
          }
        },
        {
          $lookup: {
            from: 'posts',
            localField: 'followed_user_id',
            foreignField: 'uid',
            as: 'friend_posts'
          }
        },
        {
          $unwind: '$friend_posts'
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'friend_posts.uid',
            foreignField: 'user_id',
            as: 'profile'
          }
        },
        {
          $unwind: '$profile'
        },
        {
          $project: {
            _id: 0,
            post: '$friend_posts',
            username: '$profile.username',
            profile: '$profile.profile'
          }
        },
        {
          $sort: {
            'post.created_at': -1
          }
        }
      ]);
  
      return result;
    } catch (error) {
      console.error('Error fetching friend posts:', error);
      throw error;
    }
  }


async function addNewPost(req, res) {
    try {
        const { discription, chips } = req.body;
        // console.log('body',req.body);
        console.log('file',req.file);
        // Check that either 'discription' or 'postImage' is provided

        // Create a new Post model instance and fill it with validated data
        const post = new Post({
            uid: req.session.id,
            description: discription,
            tags: (chips || []).join(', '), // Assuming 'chips' is an array
        });

        if(req.file){
            post.img=req.file.filename;
        }


        // Save the post data to the database
        await post.save();

        // Set the success message in the session
        req.session.success = 'Post added successfully.';
        
        // Redirect the user to the home page
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}





module.exports = {
    addNewPost,
    getAllPostByUser,
};
