// ==========================
// SELECT ELEMENTS
// ==========================
const upvoteBtn = document.getElementById("upvote_btn");
const downvoteBtn = document.getElementById("downvote_btn");

// ==========================
// HELPER FUNCTIONS
// ==========================
const sendVote = async (voteType) => {
	// Build fetch options
	const options = {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		}
	}
	if (voteType === "up") {
		options.body = JSON.stringify({
			voteType: "up",
			recipeId
		});
	} else if (voteType === "down") {
		options.body = JSON.stringify({
			voteType: "down",
			recipeId
		});
	} else {
		throw "voteType must be 'up' or 'down'"
	}
	// Send fetch request
	await fetch("/recipes/vote", options)
	.then(data => {
		return data.json()
	})
	.then(res => {
		console.log(res)
	})
	.catch(err => {
		console.log(err)
	})
}

// ==========================
// ADD EVENT LISTENERS
// ==========================
upvoteBtn.addEventListener("click", async function() {
	sendVote("up")
})

downvoteBtn.addEventListener("click", async function() {
	sendVote("down")
})