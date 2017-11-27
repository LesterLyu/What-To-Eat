const express = require('express');
const router = express.Router();
const crawler = require('../popular_times/crawler');
let Restaurant = require('../models/restaurant'); // get our mongoose model

/* GET restaurant. */
router.get('/', function(req, res, next) {
    Restaurant.findOne({
        place_id: req.query.place_id
    }, function(err, restaurant) {
        if (!restaurant || restaurant === "undefined") {
            crawler.get_popularity_by_place_id(req.query.place_id)
                .then(function (detail) {
                    let newRest = new Restaurant(detail);
                    newRest.save(function(err){
                        if(err){
                            res.status(400);
                            res.json({ success: false, msg: err });
                        }
                        res.json(detail);
                    });
                });
        }
        else {
            res.json(restaurant);
        }
    });
});
module.exports = router;
