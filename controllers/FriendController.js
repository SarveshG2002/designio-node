const Follower = require('../models/Friend.js'); // Make sure to adjust the path based on your project structure
const fs = require('fs').promises;


async function followOrUnfollow(req, res) {
    try {
        const { id } = req.body;
        const followerEntry = await Follower.findOne({
            user_id: req.session.id,
            followed_user_id: id,
        });

        if (followerEntry) {
            // If the entry exists, delete it (unfollow)
            await Follower.findByIdAndDelete(followerEntry._id);
            res.json({ message: "Unfollowed successfully", session: req.session });
        } else {
            // If the entry does not exist, create it (follow)
            const newFollower = new Follower({
                user_id: req.session.id,
                followed_user_id: id,
            });
            await newFollower.save();
            res.json({ message: "Followed successfully", session: req.session });
        }
    } catch (error) {
        console.error('Error following/unfollowing friend:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = {
    followOrUnfollow,
};
