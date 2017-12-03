const express = require('express');
const router = express.Router();
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
    if (!username || username === "undefined") {
        res.render('index.html', { curUsername:""});
    } else{
        const curUserName = req.decoded.username;
        console.log("current user name is: "+curUserName);
        res.render('index.html', { curUsername:curUserName});
    }
});
module.exports = router;
