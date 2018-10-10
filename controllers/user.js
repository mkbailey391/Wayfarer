const
mongoose = require('mongoose'),
User = require('../models/User');

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

//exports.show = async (req, res) => {
//     let id = mongoose.Types.ObjectId(req.params.id);
//     let user = await User.findById(id);
//     Place.aggregate([{
//         // This is going to return the entire card
//         $match: { $or: [{'fights.fighterOne': id  }, { 'fights.fighterTwo': id}]}},
//         // Destructuring every fight in the fights array into their own elements.
//         { $unwind: '$fights'}, {
//         // This is going only return the fights where the requested ID matches fighterOne or fighterTwo
//         $match: { $or: [{'fights.fighterOne': id  }, { 'fights.fighterTwo': id}]}}, {
//         // Formats the data that we are requesting.
//         $project: {
//             weightClass: '$fights.weightClass',
//             opponent: '$fights.fighterTwo'
//         }}
//     ]).exec((err, fights) => {
//         if (err) res.json({ status: false, err })
//         res.json({ success: true, payload: fights })
//     })