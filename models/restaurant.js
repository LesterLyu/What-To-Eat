const mongo = require('mongoose');
const Schema = mongo.Schema;


let restaurantSchema = new Schema({
    place_id: String, //google place id
    name: {type:String},
    rating: String,
    address: String, // result.formatted_address
    geometry: {lat: Number, lng: Number},
    phone: String,
    website: String,
    price:{type:Number}, // $  $$  $$$  $$$$
    url:{type:String},
    vicinity: String, // short address
    types: [],
    photos: [],
    popularity:[], // see ../popular_times/example_calls.js
});

module.exports = mongo.model('Restaurant',restaurantSchema);