require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

const notes = [
	{ id: 1, user: "joey", heading: "test2", content: "hello mom" },
	{ id: 2, user: "joey", heading: "test4", content: "hello dad" },
];
const users = [];

// fetch all notes for existing user
app.get("/api/notes", async (request, response) => {
	const authorization = request.get("authorization");
	const decodedToken = jwt.decode(authorization, "test");
	const username = decodedToken.username;
	let currentUsersNotes = [];
	notes.forEach((element) => {
		if (!element.user.includes(username)) {
			response.status(400).json({ message: "unauthorized" });
		} else {
			currentUsersNotes.push(element);
		}
	});
	response.status(200).json(currentUsersNotes);
});

// create a note for existing user only
app.post("/api/notes", async (request, response) => {
	const authorization = request.get("authorization");
	const { heading, content } = request.body;
	const decodedToken = jwt.decode(authorization, "test");
	const username = decodedToken.username;

	users.forEach((element) => {
		if (element.username.includes(username)) {
			const newNote = {
				id: notes.length + 1,
				user: username,
				heading,
				content,
			};
			notes.push(newNote);
			response.status(201).json(newNote);
		} else {
			response.status(400).json({ message: "unauthorized" });
		}
	});
});

// update a note
app.put('/api/notes/:id', (request, response)=>{
	const id = Number(request.params.id)
	const {heading, content} = request.body
	const authorization = request.get("authorization");
	const decodedToken = jwt.decode(authorization, "test");
	if(decodedToken){
		notes.forEach(element=>{
			if(element.id === id){
				const noteIndex = notes.indexOf(element)
				const updatedNote = {
					heading,
					content
				}
				notes.splice(noteIndex, 1, updatedNote)
				response.json({message: 'note has been updated'})
			}
		})
	}

})
// delete a note
app.delete("/api/notes/:id", (request, response) => {
	const id = Number(request.params.id)
	const authorization = request.get("authorization");
	const decodedToken = jwt.decode(authorization, "test");

	if (decodedToken) {
		notes.forEach(element => {
			if (element.id === id) {
				const noteIndex = notes.indexOf(element)
				notes.splice(noteIndex, 1)
				response.json({message: 'note delete'})
			}else{
				response.end()
			}
		});
	}
});

// create a user
app.post("/api/users", async (request, response) => {
	const { username, name, password } = request.body;

	const passwordHash = await bcrypt.hash(password, 10);

	const newUser = {
		id: users.length + 1,
		username,
		name,
		password: passwordHash,
	};

	const newUserWithoutPassword = {
		username,
		name,
	};

	users.push(newUser);
	response.status(201).json(newUserWithoutPassword);
});

// provide existing user with token
app.post("/api/login", async (request, response) => {
	const { username, password } = request.body;

	users.forEach(async (element) => {
		if (element.username.includes(username)) {
			const checkPassword = await bcrypt.compare(password, element.password);
			if (checkPassword) {
				const newToken = {
					username,
					password: element.password,
				};

				const signedToken = jwt.sign(newToken, "test");
				return response.status(200).json({ token: signedToken });
			}
		} else {
			return response
				.status(400)
				.json({ message: "username or password is invalid" });
		}
	});
});
app.listen(3000, console.log("server is now live"));
