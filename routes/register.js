let express = require('express');
let router = express.Router();
let jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
let User = require('../models/user'); // get our mongoose model

let config = require('../config'); // get our config file

/* GET users listing. */
router.post('/', function(req, res, next) {

    console.log(req.body);

    if(!req.body.username || req.body.username === 'undefined') {
        res.status(400);
        res.json({ success: false, msg: "Username?" });
        return;
    }


    // check existence
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (user) {
            res.status(400);
            res.json({ success: false, msg: "User exists" });

        }
        else{
            // create a sample user
            let newUser = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                admin: req.body.admin
            });

            newUser.save(function(err) {
                if (err) {
                    res.status(400);
                    res.json({ success: false, msg: err });
                }
                // create a token
                let payload = {
                    admin: newUser.admin,
                    username: newUser.username
                };
                let token = jwt.sign(payload, config.superSecret, {
                    expiresIn: 8640000 // expires in 2400 hours
                });
                res.cookie('token', token);

                res.redirect('/');
                // res.json({ success: true, msg: "Registration success"});
            });

        }
    });



});

module.exports = router;