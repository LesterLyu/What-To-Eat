const express = require('express');
const router = express.Router();
const crawler = require('../controller/google_popular_times/crawler');
const Restaurant = require('../models/restaurant'); // get our mongoose model
const places = require('../controller/places');

/* GET restaurant. */
router.get('/google_place_id', function(req, res, next) {
    places.getRestaurantByGooglePlaceId(req.query.place_id)
        .then(content => {
            if(content.success === false)
                res.status(400);
            res.json(content);
        })

});
module.exports = router;
