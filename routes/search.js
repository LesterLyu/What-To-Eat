const express = require('express');
const router = express.Router();
const crawler = require('../controller/google_popular_times/crawler');
const Restaurant = require('../models/restaurant'); // get our mongoose model
const places = require('../controller/places');

/* GET restaurant. */
router.get('/', function(req, res, next) {

    places.doFilter(req.query.latitude, req.query.longitude, req.query.radius, req.query.workload,
        req.query.day, req.query.hour, function (result) {
            if(!result.success)
                res.status(400);
            res.json(result);
        })

});
module.exports = router;
