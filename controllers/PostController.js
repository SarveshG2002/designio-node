const Post = require('../models/Post'); // Make sure to adjust the path based on your project structure
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

async function addNewPost(req, res) {
    try {
        const { discription, chips } = req.body;
        console.log('body',req.body);
        // Check that either 'discription' or 'postImage' is provided
        if (!discription && !req.file) {
            return res.status(400).send({ error: 'Please provide either a description or an image.' });
        }

        // Create a new Post model instance and fill it with validated data
        const post = new Post({
            uid: req.session.id,
            description: discription,
            tags: (chips || []).join(', '), // Assuming 'chips' is an array
        });

        // Handle file upload if 'postImage' is provided
        if (req.file) {
            const image = req.file;
            const imageName = uuidv4() + '.' + image.originalname.split('.').pop();
            const imagePath = 'uploads/posts/' + imageName;

            // Store the uploaded image
            await fs.writeFile(imagePath, image.buffer);

            // Set the 'img1' property in the model to the image path
            post.img1 = imagePath;
        }

        // Save the post data to the database
        await post.save();

        // Set the success message in the session
        req.session.success = 'Post added successfully.';
        
        // Redirect the user to the home page
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = {
    addNewPost,
};
