const mongo = require('mongoose');
const Schema = mongo.Schema;


let messagesSchema = new Schema({
    title: {type: String},
    data: {type: String,require: true},
    date:{type: String, required: true},
});

module.exports = mongo.model('messages',messagesSchema);