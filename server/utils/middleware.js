// get authorization token from request
function fetchToken(request, response, next) {
	const authorization = request.get("authorization");
	if (authorization) {
		request.token = authorization;
	}
	next();
}

module.exports = {fetchToken}