import React from "react";

const Login = () => {
	return (
		<div>
			<h1>Login</h1>
			<h3>Save your notes online</h3>
			<form>
				<p>
					username <input type="text" />
				</p>
				<p>
					password <input type="password" />
				</p>
				<button>Login</button>
			</form>
		</div>
	);
};

export default Login;
