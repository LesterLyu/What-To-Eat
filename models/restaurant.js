const mongo = require('mongoose');
const Schema = mongo.Schema;

// yelp
let restaurantSchema = new Schema({
    id: String,
    name: {type:String},
    image_url: String,
    url: String, // yelp url
    review_count: Number,
    categories: [],
    rating: String,
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    price:{type:String}, // $  $$  $$$  $$$$

    address: [], // location.display_address
    phone: String, // display_phone

    popularity:[], // see ../popular_times/example_calls.js
});

module.exports = mongo.model('Restaurant',restaurantSchema);