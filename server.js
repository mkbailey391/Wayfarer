//Dependencies
const
	express = require('express'),
	app = express(),
	ejsLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	MongoDBStore = require('connect-mongodb-session')(session),
	passport = require('passport'),
	passportConfig = require('./config/passport'),
    //usersRouter = require('./routes/users.js'),
    PORT = 3000;

//Middleware
app.use(logger('dev'));
app.use(cookieParser()); 
app.use(express.urlencoded({extended: true})); 
app.use(flash()); 
app.use(methodOverride('_method'));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(ejsLayouts);

//Root Route
app.get('/', (req,res) => {
    res.render('index')
    })

//Port up and running
app.listen(PORT, (err) => {
    console.log(err || `Server running on port ${PORT}`)
    })