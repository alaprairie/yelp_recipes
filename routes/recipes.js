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
	const newRecipe = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		ingredients: req.body.ingredients,
		date: req.body.date,
		series: req.body.series,
		issue: req.body.issue,
		genre,
		color: !!req.body.color, //turns it into a boolean
		image_link: req.body.image,
		owner: {
			id: req.user._id,
			username: req.user.username
		},
		upvotes: [req.user.username],
		downvotes: []
	}
	
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
	const validGenres = ["cajun", "slow-cooker", "goblin"];
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
router.post("/vote", isLoggedIn, (req, res) => {
	res.json({
		message: "Voted!"
	})
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
	const recipeBody = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		ingredients: req.body.ingredients,
		date: req.body.date,
		series: req.body.series,
		issue: req.body.issue,
		genre,
		color: !!req.body.color, //turns it into a boolean
		image_link: req.body.image
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