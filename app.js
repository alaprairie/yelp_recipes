// =====================
// IMPORTS
// =====================
// NPM Imports
const express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  flash = require('connect-flash'),
	  mongoose = require('mongoose'),
	  methodOverride = require('method-override'),
	  // morgan = require('morgan'),
	  passport = require('passport'),
	  LocalStrategy = require('passport-local').Strategy,
	  expressSession = require('express-session');


// Config Import
try{
	var config = require('./config');
} catch (e) {
	console.log("Could not import config. This probably means you're not working locally.")
	console.log(e);
}


// Route Imports
const recipeRoutes = require('./routes/recipes'),
	  commentRoutes = require('./routes/comments'),
	  mainRoutes = require('./routes/main'),
	  authRoutes = require('./routes/auth');

// Model Imports
const Recipe = require('./models/recipe'),
	  Comment = require('./models/comment'),
	  User = require('./models/user');

// =====================
// DEVELOPMENT
// =====================
// Morgan
// app.use(morgan('tiny'));

// Seed the DB
// const seed = require('./utils/seed');
// seed();

// =====================
// CONFIG
// =====================
// Body Parser Config
app.use(bodyParser.urlencoded({extended: true}));

// Connect to DB
try {
	mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
} catch (e) {
	console.log("Could not connect using config. This probably means you are not working locally.");
	mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
}


// Express Config
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json({
	type: ["application/json", "text/plain"]
}))

// Express Session Config
app.use(expressSession({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUninitialized: false
}));

// Method Override Config
app.use(methodOverride('_method'));

// Connect Flash
app.use(flash());

// Passport Config
app.use(passport.initialize());
app.use(passport.session()); // Allows persistent sessions
passport.serializeUser(User.serializeUser()); // What data should be stored in session
passport.deserializeUser(User.deserializeUser()); // Get the user data from the stored session
passport.use(new LocalStrategy(User.authenticate())); // Use the local strategy

// State config
app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
})

// Route Config
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments", commentRoutes);



// =====================
// LISTEN
// =====================
app.listen(process.env.PORT || 3000, () => {
	console.log("yelp_recipes is running...")
})