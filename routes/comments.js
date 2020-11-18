const express = require('express'),
	  router = express.Router({mergeParams: true}),
	  Comment = require('../models/comment'),
	  Recipe = require('../models/recipe'),
	  isLoggedIn = require('../utils/isLoggedIn'),
	  checkCommentOwner = require('../utils/checkCommentOwner');

// New comment - show form
router.get("/new", isLoggedIn, (req, res) =>{
	res.render("comments_new", {recipeId: req.params.id})
})

// create comment - actually update database
router.post("/", isLoggedIn, async (req, res) =>{
	// Create the comment
	try {
		const comment = await Comment.create({
		user: {
			id: req.user._id,
			username: req.user.username
		},
		text: req.body.text,
		recipeId: req.body.recipeId
		})
		console.log(comment);
		res.redirect(`/recipes/${req.body.recipeId}`)
	} catch (err) {
		console.log(err);
		res.send("Broken again... POST comments")
	}
})

// Edit Comment - Show the edit form
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		console.log("recipe:", recipe)
		console.log("comment:", comment)
		res.render("comments_edit", {recipe, comment});
	} catch (err) {
		console.log(err);
		res.send("Broke Comment Edit GET");
	}
})

// Update Comment - Actually update in DB
router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true})
		console.log(comment);
		res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("broken comment PUT")
}
})

// Delete Comment
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("Broken again comment DELETE");
	}
})



module.exports = router;