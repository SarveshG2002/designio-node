const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // Assuming you have a reference to the Users model
  username: { type: String, required: true, unique: true },
  profile: { type: String },
  bio: { type: String },
  profession: { type: String },
  experience: { type: String },
  skills: { type: String },
  location: { type: String },
  presence: { type: String },
  gender: { type: String },
  created_at: { type: String, default: Date.now },
  updated_at: { type: String, default: Date.now },
});

// Export the Profile model
const Profile = mongoose.model('Profiles', profileSchema);
module.exports = Profile;
