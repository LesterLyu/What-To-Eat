let express = require('express');
let router = express.Router();
let jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
let config = require('../config'); // get our config file
let User = require('../models/user'); // get our mongoose model

/* GET users listing. */
router.post('/', function(req, res, next) {

    console.log("verifying user: " + req.body.username + " password: " + req.body.password);

    // find the user
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;
        if (!user || user === "undefined") {
            res.status(400);
            res.json({ success: false, msg: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password !== req.body.password) {
                res.status(400);
                res.json({ success: false, msg: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                let payload = {
                    admin: user.admin,
                    username: user.username
                };
                let token = jwt.sign(payload, config.superSecret, {
                    expiresIn: 8640000 // expires in 2400 hours
                });
                res.cookie('token', token);
                res.json({success:true});
            }
        }
    });
});

module.exports = router;
