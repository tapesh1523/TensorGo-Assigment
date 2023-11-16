const express = require("express");
const router = express.Router();

const invoice = require("../modal/invoice");

router.get("/invoices", async (req, res) => {
	try {
		const invoices = await invoice.find();
		res.json(invoices);
	} catch (error) {
		console.error("Error fetching invoices:", error);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
