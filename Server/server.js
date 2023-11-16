// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Use express.json() for parsing JSON

mongoose.connect(
	"mongodb+srv://gofood:mern123@cluster0.w2kqhyw.mongodb.net/tensorgo?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

app.use("/api", require("./routes/invoice"));
app.use("/api", require("./routes/login"));
app.use("/api", require("./routes/reminder"));

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
