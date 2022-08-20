const Users = require('../models/users')
const jwt = require("jsonwebtoken");

// get authorization token from request
function fetchToken(request, response, next) {
	const authorization = request.get("authorization");
	if (authorization) {
		request.token = authorization;
	}
	next();
}

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

module.exports = {fetchToken, decodeToken}