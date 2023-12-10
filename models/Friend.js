const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user_id:String,
  followed_user_id:String,
});

const Follower = mongoose.model('Followers', postSchema);

module.exports = Follower;
