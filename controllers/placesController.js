//Require in 'Place' Model

const Place = require('../models/Place');

//Get all places
exports.index = (req, res)=>{
    Place.find({}, (err, places)=>{
        if (err) res.json({success: false, payload: err});
        res.json({success: true, payload: places});
        //res.render('places/index', {success: true, payload: places})
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
    Place.findById(req.params.id, (err, place) =>{
        if (err) res.json ({success: false, err});
        res.json({success: true, payload: place});
    })
}

//update a place.
exports.update = (req, res) =>{
    Place.findByIdAndUpdate(req.params.id, req.body, (err, place) =>{
        if (err) res.json({success: false, err});
        res.json({success: true, payload: place});
    })
}

//delete a place. 
exports.delete = (req, res) =>{
    Place.findByIdAndDelete(req.params.id, (err, deletedPlace) =>{
        if (err) res.json({success: false, err});
        res.json({success: true, deletedPlace});
    })
}
