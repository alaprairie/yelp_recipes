const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error", "Hey! Please log in to do that.");
		res.redirect("/login");
	}
};

module.exports = isLoggedIn;