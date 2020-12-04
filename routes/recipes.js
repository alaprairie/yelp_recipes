const express = require('express'),
	  router = express.Router(),
	  Recipe = require('../models/recipe'),
	  Comment = require('../models/comment'),
	  isLoggedIn = require('../utils/isLoggedIn'),
	  checkRecipeOwner = require('../utils/checkRecipeOwner');

// Index
router.get("/", async (req, res) => { //index route
	console.log(req.user);
	try {
		const recipes = await Recipe.find().exec();
		res.render("recipes", {recipes});
	} catch (err) {
		console.log(err);
		res.send("you broke it! /index");
	}
})

// Create
router.post("/", isLoggedIn, async (req, res) => {
	const genre = req.body.genre.toLowerCase();
	const raw_ing = req.body.ingredients;
	const raw_ing_measurement = req.body.ingredients_measurement;
	const raw_ing_amount = req.body.ingredients_amount;
	const ingredients = [];
	raw_ing.forEach((ing, i) => {
		ingredients.push({
			name: raw_ing[i],
			amount: raw_ing_amount[i],
			measurement: raw_ing_measurement[i]
		})
	})
	const newRecipe = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		ingredients: ingredients,
		date: req.body.date,
		instructions: req.body.instructions,
		genre,
		image_link: req.body.image_link,
		owner: {
			id: req.user._id,
			username: req.user.username
		},
		upvotes: [req.user.username],
		downvotes: []
	}
	console.log(req.body);
	console.log(newRecipe);
	
	try {
		const recipe = await Recipe.create(newRecipe);
		req.flash("success", "Recipe Created!");
		res.redirect("/recipes/" + recipe._id);
	} catch (err) {
		req.flash("error", "Error creating recipe");
		res.redirect("/recipes");
	}
})

// New
router.get("/new", isLoggedIn, (req, res) => { 
	res.render("recipes_new");
})

// Search
router.get("/search", async (req, res) => {
	try {
		const recipes = await Recipe.find({
			$text: {
				$search: req.query.term
			}
		})
		res.render("recipes", {recipes});
	} catch (err) {
		console.log(err);
			res.send("broken search");
	}
})

// Genre
router.get("/genre/:genre", async (req, res) => {
	// Check if the given genre is valid
	const validGenres = ["cajun", "slow-cooker", "goblin", "chinese", "mexican", "italian", "japanese", "greek", "french", "swiss", "puerto-rican", "thai", "indian", "canadian", "other"];
	if (validGenres.includes(req.params.genre.toLowerCase())) {
		// If yes, continue
		const recipes = await Recipe.find({genre: req.params.genre}).exec();
		res.render("recipes", {recipes});
	} else {
		// If no, send an error
		res.send("Please enter a valid genre")
	}
});

// Vote
router.post("/vote", isLoggedIn, async (req, res) => {
	console.log("Request body:", req.body);
	// {
	// 	recipeId:"abc123"
	// 	voteType: "up" or "down"
	// }
	const recipe = await Recipe.findById(req.body.recipeId);
	const alreadyUpvoted = recipe.upvotes.indexOf(req.user.username) // will be -1 if not found
	const alreadyDownvoted = recipe.downvotes.indexOf(req.user.username) // will be -1 if not found
	
	let response = {}
	// Voting logic
	if (alreadyUpvoted === -1 && alreadyDownvoted === -1) { // has not voted
		if (req.body.voteType === "up") { // Upvoting
			recipe.upvotes.push(req.user.username);
			recipe.save()
			response = {message: "Upvote tallied!", code: 1}
		} else if (req.body.voteType === "down") { // Downvoting
			recipe.downvotes.push(req.user.username);
			recipe.save()
			response = {message: "Downvote tallied!", code: -1}
		} else { // Error
			response = {message: "Error 1", code: "err"}
		}
	} else if (alreadyUpvoted >= 0) { // already upvoted
		if (req.body.voteType === "up") {
			recipe.upvotes.splice(alreadyUpvoted, 1);
			recipe.save()
			response = {message: "Upvote removed", code: 0}
		} else if (req.body.voteType === "down") {
			recipe.upvotes.splice(alreadyUpvoted, 1);
			recipe.downvotes.push(req.user.username);
			recipe.save()
			response = {message: "Changed to downvote", code: -1}
		} else { // Error
			response = {message: "Error 2", code: "err"}
		}
	} else if (alreadyDownvoted >= 0) { // already downvoted
		if (req.body.voteType === "up") {
			recipe.downvotes.splice(alreadyDownvoted, 1);
			recipe.upvotes.push(req.user.username);
			recipe.save()
			response = {message: "Changed to upvote", code: 1}
		} else if (req.body.voteType === "down") {
			recipe.downvotes.splice(alreadyDownvoted, 1);
			recipe.save()
			response = {message: "Downvote removed", code: 0}
		} else { // Error
			response = {message: "Error 3", code: "err"}
		}
	} else { // Error
		response = {message: "Error 4", code: "err"}
	}
	// Update score immately prior to sending
	response.score = recipe.upvotes.length - recipe.downvotes.length;
	
	res.json(response);
})

// Show
router.get("/:id", async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id).exec();
		const comments = await Comment.find({recipeId: req.params.id});
		res.render("recipes_show", {recipe, comments})
	} catch (err) {
		console.log(err);
		res.send("you broke this /recipes/:id")
	}
})

// Edit
router.get("/:id/edit", checkRecipeOwner, async (req, res) => {
	const recipe = await Recipe.findById(req.params.id).exec(); // if loggeed in, check if they own the recipe
	res.render("recipes_edit", {recipe})
})

// Update 
router.put("/:id", checkRecipeOwner, async (req, res) => {
	const genre = req.body.genre.toLowerCase();
	const raw_ing = req.body.ingredients;
	const raw_ing_measurement = req.body.ingredients_measurement;
	const raw_ing_amount = req.body.ingredients_amount;
	const ingredients = [];
	raw_ing.forEach((ing, i) => {
		ingredients.push({
			name: raw_ing[i],
			amount: raw_ing_amount[i],
			measurement: raw_ing_measurement[i]
		})
	})
	const recipeBody = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		ingredients: ingredients,
		date: req.body.date,
		instructions: req.body.instructions,
		genre,
		image_link: req.body.image_link
	}
	
	try {
	const recipe = Recipe.findByIdAndUpdate(req.params.id, recipeBody, {new: true}).exec();
	req.flash("success", "Recipe updated!")
	res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		console.log(err);
		req.flash("error", "error updating recipe")
		res.redirect("/recipes");
	}
})

// Delete
router.delete("/:id", checkRecipeOwner, async (req, res) => {
	try {
		const deletedRecipe = Recipe.findByIdAndDelete(req.params.id).exec();
		req.flash("success", "Recipe deleted!");
		res.redirect("/recipes");
	} catch(err) {
		console.log(err);
		req.flash("error", "Error deleting recipe")
		res.redirect("back");
	}
})


module.exports = router;