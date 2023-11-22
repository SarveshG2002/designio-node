// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: {type: String, required:true },
  updated_at: {type: String, required:true },
});

// Export the User model
const User = mongoose.model('Users', userSchema);
module.exports = User;
