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

// Create comment - actually update database
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
		req.flash("success", "Comment created!");
		res.redirect(`/recipes/${req.body.recipeId}`)
	} catch (err) {
		console.log(err);
		req.flash("error", "Error creating comment");
		res.redirect("/recipes");
	}
})

// Edit Comment - Show the edit form
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		res.render("comments_edit", {recipe, comment});
	} catch (err) {
		console.log(err);
		res.redirect("/recipes");
	}
})

// Update Comment - Actually update in DB
router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true})
		req.flash("success", "Comment edited!")
		res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		console.log(err);
		req.flash("error", "Error editing comment");
		res.redirect("/recipes");
}
})

// Delete Comment
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		req.flash("success", "Comment deleted!");
		res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		console.log(err);
		req.flash("error", "Error deleting comment");
		res.redirect("/recipes");
	}
})



module.exports = router;