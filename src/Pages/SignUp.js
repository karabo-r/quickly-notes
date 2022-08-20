import React from "react";
import styled from "styled-components";
const SignUp = () => {
	return (
		<Container>
			<div className="login-container">
				<h1>Sign Up</h1>
				<p>Sign up to save your notes online</p>
				<div className="inputs">
					<input placeholder="Username" type="text"></input>
					<br />
					<input placeholder="Password" type="password"></input>
				</div>
				<button>Enter</button>
				<div className="login-redirect">Login</div>
			</div>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	height: 100vh;
	/* width: 50%; */
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* background-color: teal; */
	/* position: relative; */

	.login-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* font-size: 2rem; */

		height: 50%;
		width: 50%;
		/* background-color: teal; */

		h1 {
			font-size: 2rem;
			margin-bottom: 2rem;
		}

		p {
			font-size: 1rem;
			margin-bottom: 2rem;
		}

		button{
			margin-top: 1rem;
			padding-left: 2rem;
			padding-right: 2rem;
			padding-top: 0.7rem;
			padding-bottom: 0.7rem;
			outline: none;
		}

		.inputs {
			input {
				outline: none;
				height: 2rem;
				margin-bottom: 1rem;
				font-size: 1rem;
				padding-left: 1rem;
			}
		}

		.login-redirect {
			position: relative;
			/* margin-top: 1rem */
			bottom: -3rem;
		}
	}
`;

export default SignUp;
