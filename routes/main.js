const express = require('express'),
	  router = express.Router(),
	  isLoggedIn = require('../utils/isLoggedIn');

router.get("/", (req, res) => { //landing route
	res.render("landing");
})

router.get("/account", isLoggedIn, (req, res) => {
	res.render("account");
});



module.exports = router;