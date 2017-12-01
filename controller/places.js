const google = require('../controller/google_popular_times/crawler');
const Restaurant = require('../models/restaurant'); // get our mongoose model
const yelp = require('./yelp/search');
const categories = 'restaurants';
const workloads = {
    'None': 0,
    'Up to 15 mins': 1,
    'Up to 30 mins': 2,
    'Up to 45 mins': 3,
    'Up to 60 mins': 4,
    'Up to 75 mins': 5,
    'Up to 90 mins': 6,
    'Up to 105 mins': 7,
};
const STATUS = ['Gathering data from Yelp...',
                'Gathering data from Google...',
                'Not running...'];

let sessions = {};

function getStatus(sessionID) {
    if (sessions[sessionID])
        return {
            size: sessions[sessionID].size,
            curr: sessions[sessionID].number,
            msg: STATUS[sessions[sessionID].step]
        };
    return {msg: STATUS[2]};
}


/**
 * Main search function
 * @param latitude Number
 * @param longitude Number
 * @param radius in meters
 * @param workload None, Up to 15 mins, Up to 30 mins,
 *                 Up to 45 mins, Up to 60 mins, ???
 * @param day
 * @param hour search hour
 * @param price Pricing levels to filter the search result with: 1 = $, 2 = $$, 3 = $$$, 4 = $$$$.
 *        The price filter can be a list of comma delimited pricing levels. For example, "1, 2, 3" will filter
 *        the results to show the ones that are $, $$, or $$$.
 * @param callback
 * @param sessionID
 */
function doFilter(latitude, longitude, radius, workload, day, hour, price, sessionID, callback) {
    let hasPopularity = 0;
    sessions[sessionID] = {
        number: 0,
        size: -1,
        step: 0,
    };

    let result = [];
    let datetime = new Date();
    if(day == -1) {
        day = datetime.getDay();
    }
    if(hour == -1) {
        hour = datetime.getHours();
    }

    // get all restaurants from yelp api, this will get up to 1000 results
    yelp.search(latitude, longitude, categories, radius, price)
        .then(results => {
            sessions[sessionID].size = results.length;
            sessions[sessionID].step++;
            console.log('total number: ' + sessions[sessionID].size);
            if(sessions[sessionID].size === 0)
                callback({
                    success: true,
                    total_number: sessions[sessionID].number,
                    has_popularity: hasPopularity,
                    result_size: 0,
                    result: []
                });
            results.forEach( item => {
                //console.log(item);
                let address = '';
                // may have order bug!
                item.location.display_address.forEach(item => {
                    address += item + ', ';
                });
                const placeIdentifier = item.name + ', ' + address.substring(0, address.length - 2);
                // find out if our database has the restaurant
                Restaurant.findOne({
                    id: item.id
                }).exec().then(restaurant => {
                    try{
                        const temp = restaurant.popularity.length;
                        if(temp > 0) {
                            hasPopularity++;
                            restaurant.toObject();
                            result.push(restaurant);
                        }
                    }
                    catch (err) {
                        //console.log("new!");
                        return google.get_popularity_by_place_identifier(placeIdentifier)
                            .then(data => {
                                if(data !== -1)
                                    hasPopularity++;
                                saveToDatabase(item, data, result);
                            });
                    }
                }).then(() => {
                    sessions[sessionID].number++;
                    if(sessions[sessionID].size === sessions[sessionID].number) {
                        // finishes
                        console.log("has Popularity: " + hasPopularity);
                        processFilter({total_number: sessions[sessionID].size, has_popularity: hasPopularity, result: result},
                            workload, day, hour, callback);
                    }
                });
            });
        });
}

function processFilter(data, workload, day, hour, callback) {
    let result = [];
    let num = 0, size = data.result.length;

    try {
        for(let i = 0; i < size; i ++) {
            let restaurant = data.result[i];
            num++;
            if (restaurant.popularity.length === 0 || hour <= 6 || restaurant.popularity[day][1] === null
                || !restaurant.popularity[day][1][hour - 6]) {
                continue;
            }
            // 0->Sunday, 1->Monday,...
            let curr_workload = restaurant.popularity[day][1][hour - 6][3];

            if (workloads[curr_workload] <= workload) {
                restaurant.popularity = curr_workload;
                result.push(restaurant);
            }
        }
        callback({
            success: true,
            total_number: data.total_number,
            has_popularity: data.has_popularity,
            result_size: result.length,
            result: result
        });

    }
    catch(err) {
        console.log(err);
        callback({
            success: false,
            msg: err.toString()
        });
    }
}

/**
 * Replace if id exists
 * @param item
 * @param popularity
 * @param result
 */
function saveToDatabase(item, popularity, result) {
    if(popularity === -1)
        popularity = [];

    Restaurant.findOne({
        id: item.id
    }).exec().then(restaurant => {
        let newRest = new Restaurant({
            id: item.id,
            name: item.name,
            image_url: item.image_url,
            url: item.url, // yelp url
            review_count: item.review_count,
            categories: item.categories,
            rating: item.rating,
            coordinates: item.coordinates,
            price: item.price, // $  $$  $$$  $$$$
            address: item.location.display_address,
            phone: item.display_phone,
            popularity:popularity,
        });
        result.push(newRest);
        if (!restaurant || restaurant === "undefined") {
            newRest.save(function (err) {
                if (err) {
                    console.log("Cannot save " + item.id);
                }
            });
        }
        else {
            Restaurant.findByIdAndUpdate(restaurant._id, newRest, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

//doFilter(43.663627, -79.393928, 1000, 1).then();

module.exports = {
    sessions: sessions,
    getStatus: getStatus,
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
                    return google.get_popularity_by_place_id(placeId)
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
                    return google.get_popularity_by_place_identifier(placeIdentifier)
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



