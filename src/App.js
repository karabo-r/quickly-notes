import React, { useState } from "react";
import styled from "styled-components";
import NoteServices from "./services/notes";
const App = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleName = (e) => setName(e.target.value);
	const handleUsername = (e) => setUsername(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	function loginUser() {}

	function registerUser(e) {
		e.preventDefault();
		const newUser = {
			name,
			username,
			password,
		};
		NoteServices.createUser(newUser);
	}

	const propsCollection = {
		name,
		username,
		password,
		handleName,
		handleUsername,
		handlePassword,
		registerUser,
		loginUser,
	};

	return (
		<Container>
			<NoteScreen>
				<div className="noteSidebar">sidebar</div>
				<div className="noteEditor">
					<input></input> 
					<textarea ></textarea>
				</div>
			</NoteScreen>
			<Contacts>
				<h1 className="logo">Quickly</h1>
				<div className="socials">
					<a href="#">Twitter</a>
					<a href="#">Github</a>
				</div>
			</Contacts>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	display: grid;
	grid-template-rows: 93% auto;
`;

const NoteScreen = styled.div`
	/* background-color: red; */
	display: grid;
	grid-template-columns: 23% auto;

	.noteSidebar {
		/* background-color: yellow; */
		border-right: 1px solid;
	}

	.noteEditor {
		/* padding: 3rem; */
		padding-left: 2rem;
		padding-right: 3rem;
		padding-top: 3rem;
		display: grid;
		grid-template-rows: 8% auto ;
		align-content: right;

		input, textarea{
			outline: none;
			border: none;
		}

		input{
			font-size: 2rem;
			border-bottom: 1px solid;
		}

		textarea{
			margin-top: 1rem;
			font-size: 1rem;
		}
	}
`;

const Contacts = styled.div`
	/* background-color: green; */
	display: flex;
	justify-content: space-between;
	padding-left: 3rem;
	padding-right: 3rem;
	align-items: center;

	.logo{
		font-size: 1.5rem;
	}
	
	.socials{
		font-size: 1.2rem;
	}

	.socials a{
		margin: 10px;
		text-decoration: none;
		color: black;
		outline: none;
	}
`;
export default App;
