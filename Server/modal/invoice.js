const mongoose = require("mongoose");

// Define the schema for the Invoice model
const invoiceSchema = new mongoose.Schema({
	googleId: { type: String, required: true },
	name: { type: String, required: true },
	amount: { type: Number, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
});

module.exports = mongoose.model("invoice", invoiceSchema);
