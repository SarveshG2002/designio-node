const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  uid:String,
  img:String,
  description:String,
  tags:String,
  created_at:String,
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;
