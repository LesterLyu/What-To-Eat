const express = require('express');
const router = express.Router();
let User = require('../models/user');
/* GET users listing. */
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

module.exports = router;