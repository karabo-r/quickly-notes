require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Users = require("./models/users");
const Notes = require("./models/notes");
const Middleware = require('./utils/middleware')
const routers = require('./controllers/routers')
const app = express();

app.use(express.json());
app.use('/api/login', routers.LoginRouter)
app.use('/api/users', routers.UserRouter)
app.use('/api/notes', routers.NoteRouter)
app.use(morgan("tiny"));
app.use(Middleware.fetchToken);


// connect to database
mongoose
	.connect(process.env.MONGO_URI)
	.then(console.log("connected to database"));

// get authorization token from request

// get user credentials from token
async function decodeToken(request, response, next) {
	const decodedCredentials = jwt.decode(request.token, "test");
	if (decodedCredentials) {
		// check if the user exists in the database
		const doesUserExist = await Users.findOne({
			username: decodedCredentials.username,
		});
		if (doesUserExist) {
			const userData = doesUserExist;
			request.user = userData;
		} else {
			request.user = false;
		}
	}
	next();
}

// fetch all notes for existing user by user property in notes
app.get("/api/notes", decodeToken, async (request, response) => {
	const user = request.user;
	if (user) {
		const results = await Notes.find({ user: user.username });
		response.json(results);
	} else {
		response.status(400).end();
	}
	// response.status(200).json(currentUsersNotes);
});

// create a note for existing user on database
app.post("/api/notes", decodeToken, async (request, response) => {
	const { heading, content } = request.body;
	const user = request.user;
	if (user) {
		const newNote = new Notes({
			heading,
			content,
		});

		const results = await newNote.save();
		response.json({ saved: results });
	} else {
		response.json({ message: "invalid credentials" });
	}
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

// delete a note from database
app.delete("/api/notes/:id", decodeToken, async (request, response) => {
	const id = request.params.id;
	const user = request.user;
	const doesUserExist = await Users.find({ username: user.username });
	if (doesUserExist) {
		const results = await Notes.findByIdAndDelete(id).catch(
			response.json({ message: "No blog with that id" }),
		);
		response.json({ deleted: results });
	} else {
		response.json({ message: "invalid credentials" });
	}
});

// create a user on database
app.post("/api/users", async (request, response) => {
	await Users.deleteMany()
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


app.listen(3000, console.log("server is now live"));
