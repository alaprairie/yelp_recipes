const Comment = require('../models/comment');

const checkCommentOwner = async (req, res, next) => {
	if (req.isAuthenticated()) {
		const comment = await Comment.findById(req.params.commentId).exec(); // if loggeed in, check if they own the recipe
		if (comment.user.id.equals(req.user._id)) { // if owner, then render the form to edit
			next();
		} else {
			res.redirect("back");
		}
	} else { // if not logged in, redirect to /login
		res.redirect("/login");
	}
}

module.exports = checkCommentOwner;