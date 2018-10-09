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
        
    // place.posts.push({...req.body, author:req.user })
        place.posts.push({...req.body, author: '5bb9522b4a920c103f59806e' })

    place.save((err, place) =>{
        if (err) res.json({ success: false, err})
        res.json({ status: true, payload: place})
        })
    })
}

exports.newPost =(req, res) => {
    res.render('posts/new')
};

//show a post.
exports.showPost = (req, res) => {
    let { place_id, id } = req.params;
    Place.findById(place_id, (err, showplace) => {
        if (err) res.json({ success: false, err });
        if (showplace.posts.id(id)) {
            let post = showplace.posts.id(id)
            res.json({ success: true, payload: post })
        } else {
            res.json({ success: false, payload: "Post does not exist." })
        }
    })
};

// update a post. 
exports.updatePost = (req, res)=>{
    let { place_id, id } = req.params;
    let { body } = req;
    Place.findById(place_id, (err, updatedPost) =>{
        if (err) res.json({ success: false, err});
        let post = updatedPost.posts.id(id)
        if(post) {
            for (let key in body) { post[key]= body[key]}
            updatedPost.save((err, updatedPost) =>{
                if (err) res.json({ success: false, err});
                res.json({ success: true, payload: updatedPost})
            })
        }else{
            res.json({ success: false, payload: "Place does not exist."})
        }
    })
};

// Delete a post.
exports.deletePost = (req, res) =>{
    let { place_id, id } = req.params;
    Place.findById(place_id, (err, deletedPost) =>{
        if (err) res.json({ success: false, err});
        let post = deletedPost.posts.id(id);
        if (post) {
            post.remove();
            deletedPost.save((err, deletedPost) =>{
                if (err) res.json ({ success: false, err});
                res.json({ success: true, payload: deletedPost});
            })
        }else {
            res.json({ success: false, payload: "Post does not exist."})
        }
    })
}
