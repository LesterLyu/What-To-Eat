'use strict'
const mongo = require('mongoose');
const Schema = mongo.Schema;


let userSchema = new Schema({
    username: {type: String,require: true},
    password:{type: String, required: true},
    admin:{type: Boolean, required: true},
    contactId:{type:String},
    bodyShapeId:{type:String},
    likeRestaurantId:[],
    dislikeRestaurantId:[],
});

module.exports = mongo.model('User',userSchema);