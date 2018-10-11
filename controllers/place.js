//Require in 'Place' Model

const Place = require('../models/Place');
const User = require('../models/User');

//Get all places
exports.index = (req, res)=>{
    Place.find({}, (err, places)=>{
        if (err) res.json({success: false, payload: err});
        res.render('cities/index', {success: true, places: places})
    })
}

//Create a new place
exports.create = (req, res) =>{
    Place.create(req.body, (err, place) =>{
        if (err) res.json({success: false, err});
        res.json({success: true, payload: place});
    })
}

//Show a place
exports.show = (req, res) =>{
    Place.findById(req.params.place_id, (err, place) =>{
        
        if (err) res.json ({success: false, err});
        res.render('cities/show', {success: true, place});
    })
}

//update a place.
exports.update = (req, res) =>{
    Place.findByIdAndUpdate(req.params.place_id, req.body, (err, place) =>{
        if (err) res.json({success: false, err});
        res.json({success: true, payload: place});
    })
}

//delete a place. 
exports.delete = (req, res) =>{
    let { place_id } = req.params;
    Place.findByIdAndDelete(place_id, (err, deletedPlace) =>{
        if (err) res.json({success: false, err});
        res.json({success: true, deletedPlace});
    })
}

// POST CONTROLLER

// Create a post. 
exports.createPost = (req, res) => {
    let { place_id } = req.params;
    Place.findById(place_id, (err, place)=>{
        if (err) res.json({ success: false, err});
     //use current user's id
        
    place.posts.push({...req.body, author:req.user })
       // post.posts.push({...req.body, author: '5bb9522b4a920c103f59806e' })

    place.save((err, place) =>{
        if (err) res.json({ success: false, err})
        res.redirect(`/cities/${place_id}`)
        })
    })
}

exports.newPost =(req, res) => {
    let { place_id, id } = req.params;

    res.render('posts/new', {place_id})
};

//show a post.
exports.showPost = (req, res) => {
    let { place_id, id } = req.params;
    Place.findById(place_id, (err, showplace) => {
        if (err) res.json({ success: false, err });
        if (showplace.posts.id(id)) {
            let post = showplace.posts.id(id)
            res.render('posts/show', {post})
        } else {
            res.json({ success: false, payload: "Post does not exist." })
        }
    })
};

exports.editPost = (req, res) => {
    let { place_id, id } = req.params;
    Place.findById(place_id, (err, place) => {
    if (err) res.json({success: false, payload: err});
    let posts = place.posts.id(id);
    if (posts){
        res.render('posts/edit', {success: true, post: posts, place_id, id});
    }else {
        res.json({ success: false, payload: "Post does not exist."});
    }
    })
 }
 
 exports.updatePost = (req, res) => {
    let {place_id, id} = req.params;
    let { body } = req;
    Place.findById(place_id, (err, updatedpost) => {
        if (err) res.json({ success: false, err});
        let post = updatedpost.posts.id(id)
        if (post) {
            for (let key in body) { post[key] = body[key]}
            updatedpost.save((err, updatedpost) => {
                if (err) res.json({ success: false, err});
                res.redirect(`/cities/${place_id}`)
            })
        }else {
            res.json({ success: false, payload: "Place does not exist."})
        }
    })
 }

// Delete a post.
exports.deletePost = (req, res) =>{
    let { place_id, id } = req.params;
    Place.findById(place_id, (err, deletedPost) =>{
        if (err) res.json({ success: false, err});
        let post = deletedPost.posts.id(id);
        if (post) {
            post.remove();
            deletedPost.save((err, deletedPost) =>{
            res.redirect(`/cities/${place_id}`, deletedPost)
            })
        }else {
            res.json({ success: false, payload: "Post does not exist."})
        }
    })
}
