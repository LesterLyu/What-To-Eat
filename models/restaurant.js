const mongo = require('mongoose');
const Schema = mongo.Schema;


let restaurantSchema = new Schema({

    name: {type:String},
    price:{type:Number},
    img: {type:String},
    url:{type:String},
    tag:[String], // this is tags
});

module.exports = mongo.model('Restaurant',restaurantSchema);