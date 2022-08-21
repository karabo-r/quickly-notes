import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import NoteScreen from "../components/NoteScreen";
import Contacts from "../components/Contacts";
import Router from "next/router";


const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [notes, setNotes] = useState([]);
	const [user, setUser] = useState({
		name: "",
		username: "",
		password: "",
	});
	const [activeNote, setActiveNote] = useState({
		heading: "",
		content: "",
	});

	const handleNameState = (e) => setUser({ ...user, name: e.target.value });
	const handleUsernameState = (e) =>setUser({ ...user, username: e.target.value });
	const handlePasswordState = (e) =>setUser({ ...user, password: e.target.value });

	const handleHeadingState = (e) => setActiveNote({ ...activeNote, heading: e.target.value });
	const handleContentState = (e) => setActiveNote({ ...activeNote, content: e.target.value });

	function handleSaveButton() {
		// check if this is an existing note, then update original note

		if (isLoggedIn) {
			
			if(activeNote.id){
				axios
				.put(`http://localhost:3001/notes/${activeNote.id}`, activeNote)
				.then(()=>{
					console.log('note updated');
				})
			}else{
				axios
				.post(`http://localhost:3001/notes`, activeNote)
				.then(()=>{
					console.log('note has been updated successfully');
					setNotes(notes.concat(activeNote))
				})
			}
		}else{
			Router.push('/login')
		}

	}

	// push current note to be edited on activeNote 
	function handleEditNote(note) {
		setActiveNote({
			...note,
			id: note.id
		})
		// console.log(te);
	}

	function handleDeleteNote(id) {
		axios
		.delete(`http://localhost:3001/notes/${id}`)
		.then(console.log('note has been deleted'))
	}

	useEffect(() => {
		axios.get("http://localhost:3001/notes").then((response) => {
			response.data.forEach((element) => {
				element.display = false;
			});
			setNotes(response.data);
		});
	}, []);

	useEffect(()=>{
		const userToken = localStorage.getItem('userToken');
		if (userToken) setIsLoggedIn(true)
	},[])

	const propsCollection = {
		notes,
		setNotes,
		activeNote,
		setActiveNote,
		isLoggedIn,
		handleNameState,
		handleUsernameState,
		handlePasswordState,
		handleHeadingState,
		handleContentState,
		handleSaveButton,
		handleEditNote,
		handleDeleteNote
	};

	return (
		<Container>
			<NoteScreen {...propsCollection} />
			<Contacts />
		</Container>
		// </div>
	);
};

const Container = styled.div`
	height: 100vh;
	display: grid;
	grid-template-rows: 93% auto;
	font-family: Arial, Helvetica, sans-serif;
`;

// const NoteScreen = styled.div`
// 	/* background-color: red; */
// 	border: 1px solid gray;
// 	display: grid;
// 	grid-template-columns: 22% auto;

// 	.noteSidebar {
// 		/* border-right: 1px solid; */
// 		display: grid;
// 		grid-template-rows: 8% auto;
// 		min-height: 0;

// 		.searchBox {
// 			display: flex;
// 			align-items: center;
// 			/* background-color: red; */
// 			/* margin: auto; */
// 			justify-content: center;

// 			.icons {
// 				background-color: white;
// 				width: 80%;
// 				height: 2rem;
// 			}
// 		}

// 		.noteElements {
// 			flex: 1;
// 			overflow: auto;
// 			/* background-color: green; */
// 			padding: 1.2rem;
// 			display: flex;
// 			flex-direction: column;
// 			min-height: 0;
// 			overflow-wrap: normal;
// 			/* overflow-wrap: anywhere; */

// 			::-webkit-scrollbar {
// 				width: 10px;
// 				/* height: 1rem; */
// 			}

// 			/* Track */
// 			::-webkit-scrollbar-track {
// 				background: #f1f1f1;
// 			}

// 			/* Handle */
// 			::-webkit-scrollbar-thumb {
// 				background: #888;
// 				border-radius: 10px;
// 			}

// 			/* Handle on hover */
// 			::-webkit-scrollbar-thumb:hover {
// 				background: #555;
// 			}

// 			.noteCard {
// 				/* background-color: purple; */
// 				border: 1px solid;
// 				height: 3rem;
// 				border-radius: 5px;
// 				margin-bottom: 1rem;
// 				cursor: pointer;
// 				padding-top: 1rem;
// 				padding-left: 1rem;
// 				padding-bottom: 1rem;

// 				h1 {
// 					font-size: 1rem;
// 				}

// 				p{
// 					font-size: 12px;
// 				}
// 			}
// 		}
// 	}

// 	.noteEditor {
// 		/* padding: 3rem; */
// 		padding-left: 2rem;
// 		padding-right: 3rem;
// 		padding-top: 1.5rem;
// 		display: grid;
// 		grid-template-rows: 8% auto;
// 		align-content: right;
// 		position: relative;

// 		input,
// 		textarea {
// 			outline: none;
// 			border: none;
// 		}

// 		input {
// 			font-size: 2rem;
// 			border-bottom: 1px solid;
// 		}

// 		textarea {
// 			margin-top: 1rem;
// 			font-size: 1rem;
// 			resize: none
// 		}

// 		button{
// 			position: absolute;
// 			bottom: 2rem;
// 			padding-left: 2rem;
// 			padding-right: 2rem;
// 			padding-top: 0.7rem;
// 			padding-bottom: 0.7rem;
// 			outline: none;
// 			margin-left: 2rem;
// 		}
// 	}
// `;

// const Contacts = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	padding-left: 3rem;
// 	padding-right: 3rem;
// 	align-items: center;

// 	.logo {
// 		font-size: 1.5rem;
// 	}

// 	.socials {
// 		font-size: 1.1rem;
// 	}

// 	.socials a {
// 		margin-left: 10px;
// 		text-decoration: none;
// 		color: black;
// 		outline: none;
// 	}
// `;
export default App;
