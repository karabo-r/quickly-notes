const UserRouter = require('express').Router()
const Users = require("./models/users");
const bcrypt = require("bcrypt");


// create a user on database
UserRouter.post("/", async (request, response) => {
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

module.exports = {UserRouter}