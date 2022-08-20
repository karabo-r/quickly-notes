const NoteRouter = require("express").Router();

// fetch all notes for existing user by user property in notes
NoteRouter.get("/", decodeToken, async (request, response) => {
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
NoteRouter.post("/", decodeToken, async (request, response) => {
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
NoteRouter.put("/:id", async (request, response) => {
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
NoteRouter.delete("/:id", decodeToken, async (request, response) => {
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

// provide existing user on database with token
NoteRouter.post("/", decodeToken, async (request, response) => {
	const { username, password } = request.body;
	// const loggedUser = await Users.findOne({ username });
	const user = request.user;

	if (user) {
		const checkPassword = bcrypt.compare(password, user.password);
		if (checkPassword) {
			const credentials = {
				username,
				password: user.password,
			};

			const signedToken = jwt.sign(credentials, "test");
			response.status(201).json({ token: signedToken });
		}
	} else {
		response.status(400).json({ message: "invalid credentials" });
	}
});

module.exports = {
	NoteRouter,
};
