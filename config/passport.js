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

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) =>{
        User.findOne({ email }, (err, user) => {
            if (err) return done(err);
            if (user) return done(null, false, req.flash('signupMessage', "Email already used."));
            User.create(req.body, (err, newUser) =>{
                if (err) return console.log(err);
                return done(null, newUser, null);
            })
        })
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done)=>{
        User.findOne({ email }, (err, user) =>{
            if (err) return done(err);
            if (!user) return done(null, false, req.flash('loginMessage', "User does not exist"));
            if (!user.isValidPassword(password)) return done(null, false, req.flash('loginMessage', "Incorrect Password"));
            return done(null, user);
        })
    }))

    module.exports = passport;