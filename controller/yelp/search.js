'use strict';
const yelp = require('yelp-fusion');
let config = require('../../config'); // get our config file
const client = yelp.client(config.yelpAccessToken);

/**
 * https://www.yelp.com/developers/documentation/v3/business_search
 * Search up to 50 results
 * @param latitude
 * @param longitude
 * @param categories
 * @param radius
 * @param offset
 * @returns Promise
 */
function yelpBasicSearch(latitude, longitude, categories, radius, offset=0) {
    return client.search({
        latitude: latitude,
        longitude: longitude,
        categories: categories,
        radius: radius,
        limit:50,
        open_now: true,
        offset: offset,
    }).then(response => {
        //console.log(response.jsonBody);
        return response.jsonBody;
    }).catch(err => {
        console.log(err);
    })
}

/**
 * Search up to 1000 businesses
 * @param latitude
 * @param longitude
 * @param categories
 * @param radius
 */
function yelpSearch(latitude, longitude, categories, radius) {
    let size = -1;
    let results = [];
    let promises = [];

    return yelpBasicSearch(latitude, longitude, categories, radius)
        .then(body => {
            body.businesses.forEach(item => {
                results.push(item);
            });

            size = body.total;
            for(let i = results.length; i < size - 50 && i - 50 < 1000; i += 50) {
                promises.push(
                    yelpBasicSearch(latitude, longitude, categories, radius, i)
                        .then(body => {
                            //console.log(body);
                            body.businesses.forEach(item => {
                                results.push(item);
                            });
                        }));
            }
        })
        .then( () => {
            return Promise.all(promises)
                .then(() => {
                    //console.log("All done!");
                    return results;
                })
        });
}
module.exports.search = yelpSearch;
//yelpSearch(43.663627, -79.3939287, 'restaurants', 700).then(result => {console.log(result)});
