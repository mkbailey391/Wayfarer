mongoose = require('mongoose');
//const Post = require('./post');

//Post Schema
const postSchema = new mongoose.Schema({
    name: String, 
    country: String, 
    image: String, 
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
})

//Create place schema. 
const placeSchema = new mongoose.Schema({
    city: String, 
    picture: String, 
    post: [postSchema]
})

//create model. 
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
