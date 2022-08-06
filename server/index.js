require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(fetchToken)

// connect to database
mongoose
	.connect(process.env.MONGO_URI)
	.then(console.log("connected to database"));

// model for notes
const noteSchema = new mongoose.Schema({
	heading: String,
	content: String,
});

const Notes = mongoose.model("Notes", noteSchema);

// model for user
const userSchema = new mongoose.Schema({
	username: String,
	name: String,
	password: String,
});

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.password;
	},
});

const Users = mongoose.model("Users", userSchema);

// get authorization token from request
function fetchToken(request, response, next) {
	const authorization = request.get("authorization");
	if (authorization) {
		request.token = authorization;
	}
	next();
}

// get user credentials from token
function decodeToken(request, response, next) {
	const decodedCredentials = jwt.decode(request.token, "test");
	if (decodedCredentials) {
		request.user = decodedCredentials;
	}
	next();
}

// fetch all notes for existing user by user property in notes
app.get("/api/notes", decodeToken, async  (request, response) => {
	const user = request.user
	if (user) {
		const results = await Notes.find({user: user.username})
		response.json(results)
	}
	// response.status(200).json(currentUsersNotes);
});

// create a note for existing user only
app.post("/api/notes", async (request, response) => {
	const { heading, content } = request.body;
	const newNote = new Notes({
		heading,
		content,
	});
	const results = await newNote.save();
	response.status(201).json(results);
});

// update a note
app.put("/api/notes/:id", async (request, response) => {
	const id = request.params.id;
	const { heading, content } = request.body;
	const updateNote = {
		heading,
		content,
	};
	const results = await Notes.findById(id, updateNote, { new: true });
	response.json(results);
});

// delete a note
app.delete("/api/notes/:id", (request, response) => {
	const id = request.params.id;
	// const authorization = fetchToken(request)
	// const
});

// create a user on database
app.post("/api/users", async (request, response) => {
	const { username, name, password } = request.body;

	const passwordHash = await bcrypt.hash(password, 10);

	const newUser = new Users({
		username,
		name,
		password: passwordHash,
	});

	const results = await newUser.save();
	response.status(201).json(results);
});

// provide existing user on database with token
app.post("/api/login", async (request, response) => {
	const { username, password } = request.body;
	const loggedUser = await Users.findOne({ username });

	if (loggedUser) {
		const checkPassword = bcrypt.compare(password, loggedUser.password);
		if (checkPassword) {
			const credentials = {
				username,
				password: loggedUser.password,
			};

			const signedToken = jwt.sign(credentials, "test");
			response.status(201).json({ token: signedToken });
		}
	} else {
		response.status(400).json({ message: "invalid credentials" });
	}
});
app.listen(3000, console.log("server is now live"));
