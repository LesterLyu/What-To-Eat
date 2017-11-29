const crawler = require('../controller/google_popular_times/crawler');
const Restaurant = require('../models/restaurant'); // get our mongoose model
const yelp = require('./yelp/search');
const categories = 'restaurants';

/**
 *
 * @param latitude Number
 * @param longitude Number
 * @param radius in meters
 * @param workload 0 -> None, 1-> Up to 15 mins, 2-> Up to 30 mins,
 *                 3-> Up to 45 mins, 4-> Up to 60 mins, 5 -> above 60min
 */
function doFilter(latitude, longitude, radius, workload) {
    // get all restaurants from yelp api, this will get up to 1000 results
    return yelp.search(latitude, longitude, categories, radius)
        .then(results => {
            //console.log(results);
            results.forEach( item => {
                //console.log(item);
                let address = '';
                item.location.display_address.forEach(item => {
                    address += item + ', ';
                });
                const placeIdentifier = item.name + ' ' + address.substring(0, address.length - 2);
                console.log(placeIdentifier);

            })
    });

}

doFilter(43.663627, -79.393928, 400, 1).then();

module.exports = {
    doFilter: doFilter,

    /**
     * Get restaurant detail from Google
     * Save it if database does not have it, otherwise return the data from database.
     * @param placeId google place id
     */
    getRestaurantByGooglePlaceId: placeId => {
        return Restaurant.findOne({
            place_id: placeId
        }).exec()
            .then(function (restaurant) {
                if (!restaurant || restaurant === "undefined") {
                    return crawler.get_popularity_by_place_id(placeId)
                        .then(function (detail) {
                            let newRest = new Restaurant(detail);
                            newRest.save(function (err) {
                                if (err) {
                                    return {success: false, msg: err};
                                }
                                return {success: true, detail: detail};
                            });
                        });
                }
                else {
                    return {success: true, detail: restaurant};
                }
            });
    },

    getRestaurantByPlaceIdentifier: placeIdentifier => {
        return Restaurant.findOne({
            place_id: placeIdentifier
        }).exec()
            .then(function (restaurant) {
                if (!restaurant || restaurant === "undefined") {
                    return crawler.get_popularity_by_place_identifier(placeIdentifier)
                        .then(function (detail) {
                            let newRest = new Restaurant(detail);
                            newRest.save(function (err) {
                                if (err) {
                                    return {success: false, msg: err};
                                }
                                return {success: true, detail: detail};
                            });
                        });
                }
                else {
                    return {success: true, detail: restaurant};
                }
            });
    }
};



