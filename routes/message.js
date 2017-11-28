var express = require('express');
var router = express.Router();
let Messages = require('../models/messages');
let User = require('../models/user');
/* GET messages listing. */
router.get('/', function(req, res, next) {
    /*res.send('Hi ' + req.decoded.username + ', Here are the unreaded messsages:');*/
    let document = [];
    User.find({username: req.decoded.username, 'messages.is_read': false}, 'messages.msgid', function (err, docs) {
        if (err) {
            res.json({ success: false });
        }
        docs.forEach(function (element) {
            let itemprocessed = 0;
            for (let i = 0; i < element.messages.length; i++) {
                Messages.findById(element.messages[i].msgid, 'content', function (err, adventure) {
                    if (err) {
                        res.json({success: false});
                    }
                    itemprocessed++;
                    document.push(adventure);
                    if(itemprocessed == element.messages.length - 1){
                        res.json(document);
                    }
                })
            }
        });
    })
});


router.delete('/:id', function (req, res, next) {
    let id = req.params.id;
    Messages.deleteOne({_id: id}, function (err) {
        if (err){
            console.log(err);
        }
        User.updateMany(
            {},
            {$pull: {messages: {msgid: id}}},
            function (err, raw) {
                if(err)
                    console.log(err);
                console.log(raw);
                res.json({ success: true });
                console.log('message with id ' + id + ' deleted successfully');
            }
        );

    });
});

router.put('/:id/readed', function (req, res, next){
    let id = req.params.id;
    let usern = req.decoded.username;
    User.update({username: usern, 'messages.msgid': id}, {$set: {"messages.$.is_read": true}}, function (err, raw) {
        if(err)
            console.log(err);
        console.log(raw);
        res.json({ success: true });
    })
});
module.exports = router;