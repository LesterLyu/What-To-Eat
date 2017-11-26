var express = require('express');
var router = express.Router();
let Messages = require('../models/messages');
let User = require('../models/user');

/* GET messages listing. */
router.get('/', function(req, res, next) {
    /*res.send('Hi ' + req.decoded.username + ', Here are the unreaded messsages:');*/
    User.find({'messages.isRead': true}, 'messages.messageid', function (err, docs) {
        if (err) {
            res.json({ success: false });
        }
        Messages.findById(res, 'content', function (err, adventure) {
            if (err) {
                res.json({ success: false });
            }
            res.json({adventure})
        });
    })


});


/* POST messages listing. */
router.post('/', function(req, res, next) {
    // create a sample message
    let newMessage = new Messages({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
    });

    newMessage.save(function(err) {
        if (err) {
            res.json({ success: false });
        }
        console.log(newMessage + '\nnew message posted successfully');
        res.json({ success: true });
    });

    User.updateMany(
        {},
        {$push: {messages:{messageid:newMessage._id, isRead: false}}}
    );
});

router.delete('/', function (req, res, next) {

})
module.exports = router;