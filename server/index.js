require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

const notes = [];
const users = [];

// fetch all notes for existing user
app.get('/api/notes', async(request, response)=>{
    const authorization = request.get('authorization')
    const decodedToken = await jwt.decode(authorization, "test")
    const username = decodedToken.username
    notes.forEach(element => {
        if (element.user.includes(username)) {
            response.status(200).json({element})
        }
        response.status(400).json({message: "unauthorized"})
    });
})

// create a note
app.post("/api/notes", (request, response) => {
	const { heading, content } = request.body;

	const newNote = {
		heading,
		content,
	};

	notes.push(newNote);
	response.status(201).json(newNote);
});
// update a note
// delete a note

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

	users.push(newUser);
	response.status(201).json(newUser);
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

				const signedToken = await jwt.sign(newToken, "test");
				return response.status(200).json({token:signedToken});
			}
		} else {
			return response
				.status(400)
				.json({ message: "username or password is invalid" });
		}
	});
});
app.listen(3000, console.log("server is now live"));
