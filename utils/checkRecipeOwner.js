const Recipe = require('../models/recipe');

const checkRecipeOwner = async (req, res, next) => {
	if (req.isAuthenticated()) {
		const recipe = await Recipe.findById(req.params.id).exec(); // if loggeed in, check if they own the recipe
		if (recipe.owner.id.equals(req.user._id)) { // if owner, then render the form to edit
			next();
		} else {
			res.redirect("back");
		}
	} else { // if not logged in, redirect to /login
		res.redirect("/login");
	}
}

module.exports = checkRecipeOwner;