// controllers/AuthController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');

async function authenticateUser(email, password) {
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  authenticateUser,
};
