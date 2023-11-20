const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caption: { type: String },
  imageUrl: { type: String },
  // Add other post fields as needed
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
