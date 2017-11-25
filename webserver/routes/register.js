let express = require('express');
let router = express.Router();
let User = require('../models/user'); // get our mongoose model

/* GET users listing. */
router.post('/', function(req, res, next) {

    // create a sample user
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin
    });

    newUser.save(function(err) {
        if (err) {
            res.json({ success: false });
            throw err;
        }
        console.log(newUser + '\nUser saved successfully');
        res.json({ success: true });
    });

});

module.exports = router;
