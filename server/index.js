require("dotenv").config();

// Import built-in modules
const path = require("path");

// Import third-party modules
const express = require("express");
const cors = require("cors");

// Import local modules
const { connectToMongoDB } = require("./database");
const router = require("./routes");

// Initialize the Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// Serve the frontend application
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "dist/index.html"));
});

// API routes
app.use("/api", router);

// Define the server port
const port = process.env.PORT || 4005;

// Function to start the server
async function startServer() {
	try {
		// Connect to MongoDB
		await connectToMongoDB();

		// Start listening for requests
		app.listen(port, () => {
			console.log(`Server is listening on http://localhost:${port}`);
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1); // Exit the process with a failure code
	}
}

// Start the server
startServer();
