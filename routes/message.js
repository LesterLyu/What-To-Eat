var express = require('express');
var router = express.Router();
let Messages = require('../models/messages');
let User = require('../models/user');

/* GET messages listing. */
router.get('/', function(req, res, next) {
    /*res.send('Hi ' + req.decoded.username + ', Here are the unreaded messsages:');*/
    User.find({username: req.decoded.username, 'messages.isRead': true}, 'messages.messageid', function (err, docs) {
        if (err) {
            res.json({ success: false });
        }
        var document = new Array();
        docs.forEach(function (element) {
            Messages.findById(element, 'content', function (err, adventure) {
                if (err) {
                    res.json({ success: false });
                }
                document.push(adventure);
            });
        });
        res.json(document);
    })


});


/* POST messages listing. */
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
    User.updateMany(
        {username:"lu"},
        {$push: {messages: "a"}}
    );
    newMessage.save(function(err) {
        if (err) {
            res.json({ success: false });
        }
        console.log(newMessage + '\nnew message posted successfully');
        res.json({ success: true });
    });
});

router.delete('/', function (req, res, next) {

})
module.exports = router;