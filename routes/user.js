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

/* EDIT username&email */
router.put('/', function(req, res, next){
    const newUsername = req.body.username;
    const currUsername = req.decoded.username;

    function is_email(email){
        const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailReg.test(email); }

    if(!is_email(req.body.email)) {
        res.status(400);
        res.json({ success: false, msg: "Failed: Email format error" });
        return;
    }

    // Find if edited username exist
    User.findOne({
        username: req.body.username
    }, function(err, user){
        if(user && newUsername !== currUsername) {
            res.status(400);
            res.json({ success: false, msg: "Failed: User exists" });
        }
        // same username
        if (newUsername === currUsername && req.body.email === user.email) {
            res.status(400);
            res.json({ success: false, msg: "Failed: No changes!" });
        }
        // save
        else {
            user.username = req.body.username;
            user.email = req.body.email;
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
});

module.exports = router;
