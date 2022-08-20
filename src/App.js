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
				<div className="noteEditor">editor</div>
			</NoteScreen>
			<Contacts>
				<div className="logo">logo</div>
				<div className="socials">socials</div>
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
	background-color: red;
	display: grid;
	grid-template-columns: 25% auto;

	.noteSidebar {
		background-color: yellow;
	}

	.noteEditor {
		background-color: purple;
	}
`;

const Contacts = styled.div`
	background-color: green;
	display: flex;
	justify-content: space-between;

	.logo{
		background-color: blue;
	}

	.socials{
		background-color: black;
	}
`;
export default App;
