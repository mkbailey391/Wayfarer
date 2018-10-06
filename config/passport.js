const 
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy, 
    User = require('../models/User');

    passport.serializeUser((user, done) =>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user)=>{
            done(err, user);
        });
    });



    module.exports = passport;