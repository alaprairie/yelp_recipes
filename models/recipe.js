const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
	title: String,
	description: String,
	author: String,
	ingredients: String,
	date: Date,
	series: String,
	issue: Number,
	genre: String,
	color: Boolean,
	image_link: String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	upvotes: [String],
	downvotes: [String]
});

recipeSchema.index({
	'$**': 'text'
})

module.exports = mongoose.model("recipe", recipeSchema);