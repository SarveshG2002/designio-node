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

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Handle the case where the email is already registered
      return res.status(400).send('Email already registered');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the current server timestamp
    const serverTimestamp = new Date();

    // Create a new user record with server timestamps
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      created_at: serverTimestamp,
      updated_at: serverTimestamp,
    });

    await newUser.save();

    // Authenticate the newly registered user
    req.session.user = {
      id: newUser._id,
      status: "profile_pending",
    };

    // Redirect to the user's profile or any other desired location
    res.redirect('/auth/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  authenticateUser,
  registerUser,
};
