// controllers/AuthController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Follower = require('../models/Friend.js'); 
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

async function authenticateUser(email, password) {
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (user && await bcrypt.compare(password, user.password)) {
      const userProfile = await Profile.findOne({user_id:user._id})
      if(userProfile){
        return [user,"complete",userProfile];
      }
      return [user,"profile_pending"];
    }

    return null;
  } catch (error) {
    throw error;
  }
}

async function getFollowedUsers(req) {
  try {
    const user = req.session.user;

    // Find the user's friends (users whom the current user follows)
    const followedUserIds = await Follower.find({ user_id: user._id }).distinct('followed_user_id');

    // Use the followedUserIds to filter users in the Users collection
    const followedUsers = await User.aggregate([
      {
        $match: { _id: { $in: followedUserIds } }
      },
      {
        $lookup: {
          from: 'profiles',
          localField: '_id',
          foreignField: 'user_id',
          as: 'profileArray'
        }
      },
      {
        $addFields: {
          profile: { $arrayElemAt: ['$profileArray', 0] }
        }
      },
      {
        $project: {
          profileArray: 0
        }
      }
    ]).exec();

    return followedUsers;
  } catch (error) {
    console.error('Error retrieving followed users:', error);
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
      _id: newUser._id,
      status: "profile_pending",
    };

    // Redirect to the user's profile or any other desired location
    res.redirect('/auth/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile/profile_pictures'); // Set the destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4(); // Add a unique suffix to the filename
    const fileExtension = path.extname(file.originalname); // Get the file extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
  },
});

const upload = multer({ storage });

async function updateProfile(req, res) {
  try {
    // File upload middleware
    upload.single('profile_picture')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res.status(500).send('Multer Error');
      } else if (err) {
        // An unknown error occurred when uploading
        return res.status(500).send('Unknown Error');
      }

      try {
        let profilePicturePath = null;

        // Check if a profile image is uploaded
        if (req.file) {
          profilePicturePath = req.file.path;
        }
        
        // Insert user data into the profile collection
        const userId = req.session.user._id;
        console.log(userId);
        const { username, bio, profession, experience, skills, location, presence, gender } = req.body;
        const serverTimestamp = new Date();
        await Profile.findOneAndUpdate(
          { user_id: userId },
          {
            username,
            bio,
            profession,
            experience,
            skills,
            location,
            presence,
            gender,
            profile_picture: profilePicturePath,
            created_at: serverTimestamp,
      updated_at: serverTimestamp,
          },
          { upsert: true }
        );
        const existingUser = await User.findOne({ _id:userId });
        // Update the session data (if needed)
        req.session.user.status = "complete";
        
        req.session.user.username = username;
        req.session.user.profileimg = profilePicturePath;
        req.session.user.name = existingUser.name;
        req.session.user.email = existingUser.email;


        // Redirect to the home page
        return res.redirect('/auth/login');
      } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  authenticateUser,
  registerUser,
  updateProfile,
  getFollowedUsers,
};
