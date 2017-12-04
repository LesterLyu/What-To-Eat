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
        data: req.body.data,
        date: dateString,
    });
    newMessage.save(function(err) {
        if (err) {
            res.status(400);
            res.json({ success: false, msg: err});
        }
        User.updateMany(
            {},
            {$push: {messages: {msgid: newMessage._id.toString(), is_read: false}}},
            function (err, raw) {
                if(err){
                    res.status(400);
                    res.json({ success: false, msg: err});
                }

            }
        );
        res.json({ success: true, newMessage: newMessage});
    });
});

router.delete('/:id', function (req, res, next) {
    let id = req.params.id;
    Messages.deleteOne({_id: id}, function (err) {
        if (err){
            res.status(400);
            res.json({ success: false, msg: err});
        }
        User.updateMany(
            {},
            {$pull: {messages: {msgid: id}}},
            function (err, raw) {
                if(err){
                    res.json({ success: false, msg: err});
                    res.status(400);
                }
                res.json({ success: true, msg: 'message with id ' + id + ' deleted successfully'});
            }
        );

    });
});
module.exports = router;