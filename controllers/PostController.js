const Post = require('../models/Post'); // Make sure to adjust the path based on your project structure
const fs = require('fs').promises;

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
};
