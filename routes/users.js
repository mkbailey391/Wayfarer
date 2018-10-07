const
  express = require('express'),
  usersRouter = new express.Router(),
  passport = require('passport')

  //login view
  usersRouter.get('/login', (req, res) => {
    res.render('login', { message: req.flash('loginMessage') });
  });

  usersRouter.post('/login', passport.authenticate('local-login',{
    successRedirect: "/users/profile",
    failureRedirect: "/users/login"
  }));

  //sign up 

  usersRouter.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('signupMessage') });
  });

  usersRouter.post('/signup', passport.authenticate('local-signup',{
    successRedirect: "/users/profile",
    failureRedirect: "/users/signup"
  }));


  module.exports = usersRouter;