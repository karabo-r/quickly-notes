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
		// <div style={{height: '100vh',display: 'flex', flexDirection: 'column'}}>

		<Container>
			<NoteScreen>
				<div className="noteSidebar">
					<div className="searchBox">
						<div className="icons">icons</div>
						{/* <div className="search"></div> */}
					</div>
					<div className="noteElements">
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
						<div className="noteCard">
							<h1>Title</h1>
							<p>content preview this is a test so hello mom</p>
						</div>
					</div>
				</div>
				<div className="noteEditor">
					<input></input>
					<textarea></textarea>
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
		// </div>
	);
};

const Container = styled.div`
	height: 100vh;
	display: grid;
	grid-template-rows: 93% auto;
`;

const NoteScreen = styled.div`
	/* background-color: red; */
	border: 1px solid gray;
	display: grid;
	grid-template-columns: 22% auto;

	.noteSidebar {
		/* border-right: 1px solid; */
		display: grid;
		grid-template-rows: 8% auto;
		min-height: 0;

		.searchBox {
			display: flex;
			align-items: center;
			/* background-color: red; */
			/* margin: auto; */
			justify-content: center;

			.icons {
				background-color: white;
				width: 80%;
				height: 2rem;
			}
		}

		.noteElements {
			flex: 1;
			overflow: auto;
			/* background-color: green; */
			padding: 1.2rem;
			display: flex;
			flex-direction: column;
			min-height: 0;
			overflow-wrap: normal;
			/* overflow-wrap: anywhere; */

			::-webkit-scrollbar {
				width: 10px;
				/* height: 1rem; */
			}

			/* Track */
			::-webkit-scrollbar-track {
				background: #f1f1f1;
			}

			/* Handle */
			::-webkit-scrollbar-thumb {
				background: #888;
				border-radius: 10px;
			}

			/* Handle on hover */
			::-webkit-scrollbar-thumb:hover {
				background: #555;
			}

			.noteCard {
				/* background-color: purple; */
				height: 10rem;
				border-radius: 5px;
				margin-bottom: 1rem;
				cursor: pointer;
				padding-top: 1rem;
				padding-left: 1rem;
				padding-bottom: 1rem;

				h1 {
					font-size: 1.2rem;
				}
			}
		}
	}

	.noteEditor {
		/* padding: 3rem; */
		padding-left: 2rem;
		padding-right: 3rem;
		padding-top: 3rem;
		display: grid;
		grid-template-rows: 8% auto;
		align-content: right;

		input,
		textarea {
			outline: none;
			border: none;
		}

		input {
			font-size: 2rem;
			border-bottom: 1px solid;
		}

		textarea {
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

	.logo {
		font-size: 1.5rem;
	}

	.socials {
		font-size: 1.2rem;
	}

	.socials a {
		margin: 10px;
		text-decoration: none;
		color: black;
		outline: none;
	}
`;
export default App;
