const express = require("express");
const router = express.Router();
const axios = require("axios");

const invoice = require("../modal/invoice");

router.post("/send-reminder", async (req, res) => {
	try {
		// Extract data from the request (you might want to validate or sanitize it)
		const { name, email, amount, start_date, end_date } = req.body;

		// Make a request to Zapier's API
		const zapierResponse = await axios.post(
			"https://hooks.zapier.com/hooks/catch/17078941/3koizvx/",
			{
				email,
				amount,
				name,
				start_date,
				end_date,
			}
		);
		res.status(200).send("Reminder sent successfully");
	} catch (error) {
		console.error("Error sending reminder:", error);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
