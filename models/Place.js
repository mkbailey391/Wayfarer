mongoose = require('mongoose');
//const Post = require('./post');

//Post Schema
const postSchema = new mongoose.Schema({
    title: String, 
    body: String,  
    author: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
})

//Create place schema. 
const placeSchema = new mongoose.Schema({
    city: String, 
    picture: String, 
    posts: [postSchema]
})

//create model. 
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
