const express = require('express');
const router = express.Router();
let jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
let config = require('../config'); // get our config file


/* Log out */
router.post('/', function(req, res, next) {
    res.clearCookie("token", { path: '/' });
    res.json({success: true});
});

module.exports = router;