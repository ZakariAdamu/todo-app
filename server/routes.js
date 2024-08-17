const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb");

// mongodb tables are called collections
const getCollection = () => {
	const client = getConnectedClient();
	const collection = client.db("TodoDB").collection("todos");
	return collection;
};

// GET All /todos
router.get("/todos", async (req, res) => {
	const collection = getCollection();
	const todos = await collection.find({}).toArray();
	res.status(200).json(todos);
});
// GET a /todos/:id
router.get("/todos/:id", (req, res) => {
	const jsonData = { mssg: "GET REQUEST TO /api/todos/:id", status: "success" };
	res.json(jsonData);
});

// POST /todos
router.post("/todos", async (req, res) => {
	const collection = getCollection();
	let { todo } = req.body;

	const newTodo = await collection.insertOne({ todo, status: false });
	res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
	const collection = getCollection();
	const _id = new ObjectId(req.params.id);

	const deletedTodo = await collection.deleteOne({ _id });
	res.status(200).json(deletedTodo);
});

// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
	const collection = getCollection();
	const _id = new ObjectId(req.params.id);
	const { status } = req.body;

	if (typeof status !== "boolean") {
		return res.status(400).json({ mssg: "invalid status" });
	}

	const updatedTodo = await collection.updateOne(
		{ _id },
		{ $set: { status: !status } }
	);
	res.status(200).json(updatedTodo);
});

module.exports = router;
