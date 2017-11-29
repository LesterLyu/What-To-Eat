let util = require('util');
let rp = require('request-promise');
let utf8 = require('utf8');
let config = require('../../config'); // get our config file

const radar_url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location={},{}&radius={}&types={}&key={}";
const detail_url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=%s&key=%s";

const user_agent = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) "+
"AppleWebKit/537.36 (KHTML, like Gecko) "+
"Chrome/54.0.2840.98 Safari/537.36"};

/**
 * cover the search area with circles for radar search
 * http://stackoverflow.com/questions/7477003/calculating-new-longtitude-latitude-from-old-n-meters
 * @param lower: lower bound of area (westmost + southmost)
 * @param upper: upper bound of area (eastmost + northmost)
 * @param radius: specified radius, adapt for high density areas
 * @return list of circle centers that cover the area between lower/upper
 */
function get_circle_centers(lower, upper, radius) {
    let r = 6378;
    let coords = [];
    while(lower[1] < upper[1]) {
        let tmp = lower[0];

        while (tmp < upper[0]){
            coords.append([tmp, lower[1]]);
            tmp += (0.25 / r) * (radius / Math.PI);
        }
        lower[1] += (0.25 / r) * (radius / Math.PI) / math.cos(lower[0] * Math.PI / radius)
    }
}

/**
 * check if query quota has been surpassed or other errors occured
 * @param resp
 */
function check_response_code(resp) {
    if(resp["status"] === "OK" || resp["status"] === "ZERO_RESULTS")
        return false;

    if(resp["status"] === "REQUEST_DENIED")
        return "Your request was denied, the API key is invalid.";

    if(resp["status"] === "OVER_QUERY_LIMIT")
        return"You exceeded your Query Limit for Google Places API Web Service, " +
            "check https://developers.google.com/places/web-service/usage to upgrade your quota.";

    if(resp["status"] === "INVALID_REQUEST")
        return"The query string is malformed, " +
            "check params.json if your formatting for lat/lng and radius is correct.";
}

function processPopularity(popularity) {
    if(!popularity)
        return;

}

/**
 * request information for a place and parse current popularity
 * this is not from google web service api
 * @param place_identifier: name and address string
 */
function get_popularity_by_place_identifier(place_identifier) {
    params = {
        "tbm": "map",
        "tch": 1,
        "q": place_identifier,
        "pb": "!4m12!1m3!1d4005.9771522653964!2d-122.42072974863942!3d37.8077459796541!2m3!1f0!2f0!3f0!3m2!1i1125!2i976"+
        "!4f13.1!7i20!10b1!12m6!2m3!5m1!6e2!20e3!10b1!16b1!19m3!2m2!1i392!2i106!20m61!2m2!1i203!2i100!3m2!2i4!5b1"+
        "!6m6!1m2!1i86!2i86!1m2!1i408!2i200!7m46!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e3!2b0!3e3!"+
        "1m3!1e4!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e3!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e"+
        "10!2b0!3e4!2b1!4b1!9b0!22m6!1sa9fVWea_MsX8adX8j8AE%3A1!2zMWk6Mix0OjExODg3LGU6MSxwOmE5ZlZXZWFfTXNYOGFkWDh"+
        "qOEFFOjE!7e81!12e3!17sa9fVWea_MsX8adX8j8AE%3A564!18e15!24m15!2b1!5m4!2b1!3b1!5b1!6b1!10m1!8e3!17b1!24b1!"+
        "25b1!26b1!30m1!2b1!36b1!26m3!2m2!1i80!2i92!30m28!1m6!1m2!1i0!2i0!2m2!1i458!2i976!1m6!1m2!1i1075!2i0!2m2!"+
        "1i1125!2i976!1m6!1m2!1i0!2i0!2m2!1i1125!2i20!1m6!1m2!1i0!2i956!2m2!1i1125!2i976!37m1!1e81!42b1!47m0!49m1"+
        "!3b1"
    };

    return rp({uri: "https://www.google.ca/search", headers: user_agent, qs: params})
        .then(function (data) {
            // find json EOF
            let jend = data.lastIndexOf("}");
            if(jend >= 0)
                data = data.substring(0, jend + 1);
            data = JSON.parse(JSON.parse(data)['d'].substring(4));
            data = data[0][1][0][14][84][0];
            //console.log(data);
            return data;
        })
}

/**
 * sends request to detail to get a search string and uses standard proto buffer to get additional information
 * on the current status of popular times
 * @param place_id google place_id
 * @return json detail
 */
function get_popularity_by_place_id(place_id) {
    // places api - detail search - https://developers.google.com/places/web-service/details
    const detail_str = util.format(detail_url, place_id, config.googleWebServiceKey);
    return rp({uri: detail_str, headers: user_agent, json: true})
        .then(function (repos) {
            let msg;
            if (msg = check_response_code(repos)) {
                throw new Error(msg);
            }
            let detail = repos["result"];
            let detail_json = {
                place_id: detail["place_id"],
                name: detail["name"],
                address: detail["formatted_address"],
                rating: detail["rating"],
                geometry: {
                    lat: detail.geometry.location.lat,
                    lng: detail.geometry.location.lng
                },
                phone: detail.formatted_phone_number,
                website: detail.website,
                price: detail.price_level,
                types: detail["types"],
                photos: detail.photos,
                vicinity: detail.vicinity,
                url: detail.url,
                coordinates: detail["geometry"]["location"]
            };
            let place_identifier = detail['name'] + " " + detail["formatted_address"];
            return get_popularity_by_place_identifier(place_identifier)
                .then(function (data) {
                    detail_json.popularity = data;
                    //console.log(detail_json);
                    return detail_json;
                });
        }).then(function(detail_json) {
            return detail_json;
        })
        .error(function (err) {
            console.log("Error: " + err);
        })
}

function get_current_popularity() {

}
//get_popularity_by_place_identifier("Morals Village Hot Pot Downtown 436 Dundas St W., 2nd Floor, Toronto, ON");
//get_popularity_by_place_id(gmKey, 'ChIJ5TwzBq40K4gRUQiodNubMJE');
module.exports.get_popularity_by_place_identifier = get_popularity_by_place_identifier;
module.exports.get_popularity_by_place_id = get_popularity_by_place_id;