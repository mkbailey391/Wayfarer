const
    mongoose = require('mongoose'),
    User = require('../models/User'),
    moment = require('moment'),
    Place = require('../models/Place');

exports.index = (req, res) => {
    User.find({}, (err, user) => {
        if (err) res.json({ success: false, err });
        res.json({ success: true, payload: user })
    })
}

exports.create = (req, res) => {
    let { body } = req;
    User.create(body, (err, user) => {
        if (err) res.json({ success: false, err });
        res.json({ success: true, payload: user })
    })
}

exports.show = async (req, res) => {
    let { id } = req.params;
    id = id ? mongoose.Types.ObjectId(id) : req.user._id
    let user = await User.findById(id);
    Place.aggregate([{
        // This is going to return the entire card
        $match: {'posts.author': id  }},
        // Destructuring every fight in the fights array into their own elements.
        { $unwind: '$posts'}, {
        // This is going only return the fights where the requested ID matches fighterOne or fighterTwo
        $match: {'posts.author': id  }}, {
        // Formats the data that we are requesting.
        $project: {
            title: '$posts.title',
            body: '$posts.body'
        }}
    ]).exec((err, posts) => {
        if (err) res.json({ status: false, err })
        console.log("POSTS")
        res.render('profile', { success: true, user, posts, moment })
    })
}
