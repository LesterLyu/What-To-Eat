var express = require('express');
var router = express.Router();
let Messages = require('../models/messages');
let User = require('../models/user');
/* GET messages listing. */
router.get('/', function(req, res, next) {
    /*res.send('Hi ' + req.decoded.username + ', Here are the unreaded messsages:');*/
    let document = [];
    User.find({username: req.decoded.username}, 'messages.msgid messages.is_read', function (err, docs) {
        if (err || !docs[0]) {
            res.status(400);
            res.clearCookie("token", { path: '/' });
            res.json({ success: false });
            return;
        }

        docs = docs[0].messages;
        if(docs.length === 0) {
            res.json({success: true, result: []});
            return;
        }

        let promises = [];
        for(let i = 0; i < docs.length; i++) {
            if(!docs[i].is_read) {
                promises.push(
                    Messages.findById(docs[i].msgid, 'data').exec().then(function (data) {
                        document.push(data);
                    })
                );
            }
        }
        Promise.all(promises)
            .then(() => {
                res.json({success: true, result: document});
            })
    })
});


router.put('/:id/readed', function (req, res, next){
    let id = req.params.id;
    let usern = req.decoded.username;
    User.update({username: usern, 'messages.msgid': id}, {$set: {"messages.$.is_read": true}},
        function (err, raw) {
            if(err)
                res.json({ success: false, msg: err});
            res.json({ success: true });
        })
});

router.get('/all', function(req, res, next) {
    /*res.send('Hi ' + req.decoded.username + ', Here are the unreaded messsages:');*/
    let document = [];
    User.find({username: req.decoded.username}, 'messages.msgid',
        function (err, docs) {
            if (err || !docs[0]) {
                res.json({success: false, msg: err});
                return;
            }

            docs = docs[0].messages;

            if (docs.length === 0) {
                res.json({success: true, result: []});
                return;
            }

            let promises = [];
            for (let i = 0; i < docs.length; i++) {
                let datalist = {};
                datalist['is_read'] = docs[i].is_read;
                datalist['msgid'] = docs[i].msgid;
                let p = Messages.findById(docs[i].msgid, 'data').exec().then(function(data) {
                    datalist['data'] = data.data;
                    document.push(datalist);
                });
                promises.push(p);
            }
            Promise.all(promises)
                .then(() => {
                    document.sort(function (a, b) {
                        return a.msgid > b.msgid;
                    });
                    res.json({success: true, result: document});
                });
        })

});

router.delete('/user/:id', function (req, res, next) {
    let id = req.params.id;
    User.findOneAndUpdate(
        {username: req.decoded.username},
        {$pull: {messages: {msgid: id}}},
        function (err, raw) {
            if(err){
                res.status(400);
                res.json({success: false, msg: err});
            }

            res.json({ success: true, msg: 'message with id ' + id + ' deleted successfully'});
        }
    );
});
module.exports = router;