const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const recipeSchema = new mongoose.Schema({
	title: String,
	description: String,
	author: String,
	ingredients: [{
		name: String,
		amount: Number,
		measurement: String
	}],
	date: Date,
	instructions: String,
	genre: String,
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