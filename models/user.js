const mongo = require('mongoose');
const Schema = mongo.Schema;


let userSchema = new Schema({
    username: {type: String,require: true},
    password:{type: String, required: true},
    admin:{type: Boolean, required: true},
    email: String,
    likeRestaurantId:[],
    dislikeRestaurantId:[],
    messages:[]
});

module.exports = mongo.model('User',userSchema);