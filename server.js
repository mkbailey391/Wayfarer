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
    usersRouter = require('./routes/users.js'),
    PORT = 3000;

const mongoConnectionString = 'mongodb://localhost/project-3-wayfarer'; 

// mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
    console.log(err || "Connected to MongoDB (passport-authentication)")
})

const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
});

//Middleware
app.use(logger('dev'));
app.use(cookieParser()); 
app.use(express.urlencoded({extended: true})); 
app.use(flash()); 
app.use(methodOverride('_method'));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(ejsLayouts);

// session and passport. 
app.use(session({
	secret: "Dolphins", 
	cookie: { maxAge: 600000 },
	resave: true,
	saveUninitialized: false,
	store: store
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	app.locals.currentUser = req.user;
	app.locals.loggedIn = !!req.user

	next();
});

//Root Route
app.get('/', (req,res) => {
    res.render('index')
    })

app.use('/users', usersRouter)



//Port up and running
app.listen(PORT, (err) => {
    console.log(err || `Server running on port ${PORT}`);
})