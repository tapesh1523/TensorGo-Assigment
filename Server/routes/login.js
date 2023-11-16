const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../modal/user");

router.post("/login", async (req, res) => {
	const { googleId, username, email } = req.body;

	try {
		// Check if the user already exists in the database
		let user = await User.findOne({ googleId });

		if (!user) {
			// If the user doesn't exist, create a new user
			user = new User({ googleId, username, email });
			await user.save();
		}

		// Respond with success
		res.json({ message: "Login successful", user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
