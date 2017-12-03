const express = require('express');
const router = express.Router();
let User = require('../models/user');
let jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
let config = require('../config'); // get our config file

/* Delete user */
router.delete('/', function (req, res, next) {
    let username = req.decoded.username;
    console.log(username);
    User.remove({username: username}, function (err) {
        if (err){
            res.json({success: false})
        }
        res.clearCookie("token", { path: '/' });
        res.json({success: true});
    });
});

/* EDIT username */
router.put('/', function(req, res, next){
    console.log("Editing profile");
    console.log("Current Username is: " + req.decoded.username);
    console.log("Edited Username is: " + req.body.username);

    // Find if edited username exist
    User.findOne({
        username: req.body.username
    }, function(err, user){
        if(user){ // if user name already existed
            if (req.decoded.username === req.body.username){
                res.status(400);
                res.json({ success: false, msg: "Failed: Same name!" });
            } else {
                res.status(400);
                res.json({ success: false, msg: "Failed: User exists" });
            }
        } else { // edit username
            // find current user
            User.findOne({username: req.decoded.username}, function(err, user){
                if(user){
                    // edit current user's username
                    user.username = req.body.username;
                    user.save(function (err) {
                        if (err) {
                            res.status(500);
                            res.json({ success: false, msg: err });
                        }
                        // set a new token since username changed
                        let payload = {
                            admin: user.admin,
                            username: user.username
                        };
                        let token = jwt.sign(payload, config.superSecret, {
                            expiresIn: 8640000 // expires in 2400 hours
                        });
                        res.cookie('token', token);
                        res.json({ success: true});
                    });
                }
            });
        }
    });
});

module.exports = router;
