const express = require('express'),
	  router = express.Router(),
	  User = require('../models/user'),
	  passport = require('passport');

// Sign Up - New
router.get('/signup', (req, res) => {
	res.render('signup');
});

// Sign Up - Create
router.post('/signup', async (req, res) => {
	try {
		const newUser = await User.register(new User({
			username: req.body.username,
			email: req.body.email
		}), req.body.password)
		
		console.log(newUser);
		
		passport.authenticate('local')(req, res, () => {
			res.redirect('/recipes');
		})
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

// Login - Show Form
router.get("/login", (req, res) => {
	res.render('login');
});

// Login
router.post("/login", passport.authenticate('local', {
	successRedirect: '/recipes',
	failureRedirect: '/login'
}));

// Logout
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect('/recipes');
});

module.exports = router;