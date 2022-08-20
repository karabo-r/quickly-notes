const LoginRouter = require('exress').Router()

// provide existing user on database with token
LoginRouter.post("/", decodeToken, async (request, response) => {
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

module.exports = {LoginRouter}