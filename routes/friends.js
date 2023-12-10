const express = require('express');
const router = express.Router();
const friendController = require('../controllers/FriendController');

router.post('/followfriend', friendController.followOrUnfollow);


module.exports = router;
