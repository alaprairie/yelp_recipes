const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	text: String,
	recipeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Recipe"
	}
});

module.exports = mongoose.model("comment", commentSchema);