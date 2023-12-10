const Follower = require('../models/Friend.js'); // Make sure to adjust the path based on your project structure
const fs = require('fs').promises;


async function followfriend(req,res){
    try{
        const Friend = new Follower({
            user_id: req.session.id,
            followed_user_id: req.body.id,
        });
        await Friend.save();
        res.json({message:"Followed successfully",session:req.session});
    }catch(error){
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = {
    followfriend,
};
