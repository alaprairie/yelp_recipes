const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

const recipe_seeds = [
	{
		title: "Vodka Sauce Spaghetti",
		description: "Vodka sauce is an Italian-American cuisine sauce made from a smooth tomato sauce, vodka, typical Italian herbs, and heavy cream (which gives the sauce its distinctive orange coloration). It is a key ingredient in penne alla vodka.",
		author: "Me",
		publisher: "Me",
		date: "2020-10-26",
		series: "Italian",
		issue: 1,
		genre: "goblin",
		color: true,
		image_link: "https://live.staticflickr.com/105/294062949_787fee715f_b.jpg"
	},
	{
		title: "Smothered Chicken with Caramelized Onion Gravy",
		description: "Smothering meat, seafood or vegetables is a cooking technique used in both Cajun and Creole cuisines of Louisiana. The technique involves cooking in a covered pan over low heat with a moderate amount of liquid, and can be regarded as a form of stove-top braising.",
		author: "Me",
		publisher: "Me",
		date: "2020-10-27",
		series: "Thanksgiving",
		issue: 2,
		genre: "cajun",
		color: true,
		image_link: "https://live.staticflickr.com/8142/7376763436_178c6755c3_b.jpg"
	},
	{
		title: "Beef Stroganoff",
		description: "Beef Stroganoff or beef Stroganov (Russian: бефстроганов, tr. befstróganov) is a Russian dish of sautéed pieces of beef served in a sauce with smetana (sour cream). From its origins in mid-19th-century Russia, it has become popular around the world, with considerable variation from the original recipe.",
		author: "Me",
		publisher: "Me",
		date: "2020-10-28",
		series: "Russian",
		issue: 3,
		genre: "slow cooker",
		color: false,
		image_link: "https://live.staticflickr.com/4068/4360825644_2341e95eec_b.jpg"
	}
]

const seed = async () => {
	// Delete all the current recipes and comments
	await Recipe.deleteMany();
	console.log("deleted all the recipes!")
	await Comment.deleteMany();
	console.log("deleted all the comments!")
	// Create three new recipes
	// for (const recipe_seed of recipe_seeds) {
	// 	let recipe = await Recipe.create(recipe_seed);
	// 	console.log("created a new recipe:", recipe.title)
	// 	// Create a new comment for each recipe
	// 	await Comment.create({
	// 		text: "I loved this recipe!",
	// 		user: "newuser1",
	// 		recipeId: recipe._id
	// 	})
	// 	console.log("created a new comment!")
	// }
	
}

module.exports = seed;