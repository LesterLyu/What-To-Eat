let express = require('express');
let router = express.Router();
let jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
let User = require('../models/user'); // get our mongoose model

let config = require('../config'); // get our config file

/* EDIT user profile */
router.post('/', function(req, res, next){
    console.log("Editing profile");
    console.log("Current Username is: " + req.decoded.username);
    console.log("Edited Username is: " + req.body.username);

    // Find if edited username exist
    User.findOne({
        username: req.body.username
    }, function(err, user){
        if(user){ // if user name already existed
            if (req.decoded.username == req.body.username){
                console.log("Same name");
                return res.redirect('/');
            } else {
                console.log("User existed");
                res.json({ success: false, msg: "Failed: User existed" });
            }
        } else { // edit username
            // find current user
            User.findOne({username: req.decoded.username}, function(err, user){
                if(user){
                    // edit current user's username
                    console.log("Editing current user's username");
                }
            });
        }
    });
});

module.exports = router;