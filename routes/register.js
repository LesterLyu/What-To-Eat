let express = require('express');
let router = express.Router();
let User = require('../models/user'); // get our mongoose model

/* GET users listing. */
router.post('/', function(req, res, next) {

    console.log(req.body);

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
                admin: req.body.admin,
            });

            newUser.save(function(err) {
                if (err) {
                    res.status(400);
                    res.json({ success: false, msg: err });
                }
                res.json({ success: true, msg: "Registration success"});
            });

        }
    });



});

module.exports = router;