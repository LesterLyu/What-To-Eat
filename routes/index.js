const express = require('express');
const router = express.Router();
let User = require('../models/user');
let jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
let config = require('../config'); // get our config file

/* GET home page. */
router.get('/', function(req, res, next) {
    let token = req.cookies.token;

    // verifies secret and checks exp
    jwt.verify(token, config.superSecret, function(err, decoded) {
        if (err) {

        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
        }
    });

    const username = req.decoded;
    let email = '';

    if (!username || username === "undefined") {
        res.render('index.html', { curUsername:'',  email:''});
    } else{
        const curUserName = req.decoded.username;
        User.findOne({
            username: curUserName
        }, function(err, user){
            if(user.email)
                email = user.email;
            res.render('index.html', { curUsername:curUserName, email: email});
        });
    }
});
module.exports = router;
