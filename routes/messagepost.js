const express = require('express');
const router = express.Router();
const Messages = require('../models/messages');
const User = require('../models/user');
/* POST add message. */

router.post('/', function(req, res, next) {
    // create a sample message
    let newDate = new Date();
    let dateString = "";
    dateString += (newDate.getMonth() + 1) + "/";
    dateString += newDate.getDate() + "/";
    dateString += newDate.getFullYear();
    let newMessage = new Messages({
        title: req.body.title,
        content: req.body.content,
        date: dateString,
    });
    newMessage.save(function(err) {
        if (err) {
            res.json({ success: false });
        }
        User.updateMany(
            {},
            {$push: {messages: {msgid: newMessage._id.toString(), is_read: false}}},
            function (err, raw) {
                if(err)
                    console.log(err);
            }
        );
        console.log(newMessage + '\nnew message posted successfully');
        res.json({ success: true, newMessage: newMessage});
    });
});
module.exports = router;