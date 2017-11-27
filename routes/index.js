var express = require('express');
var router = express.Router();
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

    var login = 'LOGIN';
    var logout = 'LOGOUT';
    console.log(req.body);
    var username = req.decoded;
    if (!username || username === "undefined") {
        res.render('index.html', { title: 'Express',status: login, href: "login" });
    } else{
        res.render('index.html', { title: 'Express',status: logout, href: "logout" });
    }
});

module.exports = router;
