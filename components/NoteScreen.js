import React, { useState } from "react";
import styled from "styled-components";

const NoteScreen = (props) => {
	// const [isThereActiveNote, ] = useState(false)

	return (
		<Container>
			{/* <NoteScreen> */}
			<div className="noteSidebar">
				<div className="searchBox">
					<div className="icons">icons</div>
					{/* <div className="search"></div> */}
				</div>
				<div className="noteElements">
					{props.notes?.map((note) => {
						return (
							<div className="noteCard" key={note.id} onClick={()=>props.handleEditNote(note)}>
								<div className="text">
								<h1>{note.heading}</h1>
								<p>{note.content}</p>
								</div>
								<button onClick={()=>props.handleDeleteNote(note.id)}>D</button>
							</div>
						);
					})}
				</div>
			</div>
			<div className="noteEditor">
				<input
					placeholder="Title"
					value={props.activeNote.heading}
					onChange={(e) => props.handleHeadingState(e)}
				></input>
				<textarea
					placeholder="Before you forget..."
					value={props.activeNote.content}
					onChange={(e) => props.handleContentState(e)}
				></textarea>
				{(props.activeNote.heading || props.activeNote.content) && (
					<button onClick={props.handleSaveButton}>SAVE</button>
				)}
			</div>
		</Container>
	);
};

const Container = styled.div`
	/* height: 100vh; */
	display: grid;
	grid-template-columns: 22% auto;
	/* font-family: Arial, Helvetica, sans-serif; */

	.noteSidebar {
		/* border-right: 1px solid; */
		grid-template-rows: 8% auto;
		/* background-color: rebeccapurple; */
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
				border: 1px solid;
				height: 3rem;
				border-radius: 5px;
				margin-bottom: 1rem;
				cursor: pointer;
				padding-top: 1rem;
				padding-left: 1rem;
				padding-bottom: 1rem;
				display: flex;
				justify-content: space-between;

				h1 {
					font-size: 1rem;
					margin-bottom: 5px;
				}

				p {
					font-size: 12px;
				}

				button{
					/* background-color: #fff; */
					outline: none;
					border: none;
					background-color: green;
					color: whitesmoke;
					margin-right: 15px;
				}
			}
		}
	}

	.noteEditor {
		/* padding: 3rem; */
		/* background-color: yellow; */
		border-left: 1px solid;
		padding-left: 2rem;
		padding-right: 3rem;
		padding-top: 1.5rem;
		display: grid;
		grid-template-rows: 8% auto;
		align-content: right;
		position: relative;

		input,
		textarea {
			outline: none;
			border: none;
		}

		input {
			/* letter-spacing: px; */
			font-size: 2rem;
			/* border-bottom: 2px solid gray; */
		}

		textarea {
			margin-top: 1rem;
			font-size: 1rem;
			resize: none;
		}

		button {
			position: absolute;
			background-color: green;
			border: none;
			color: whitesmoke;
			cursor: pointer;
			bottom: 2rem;
			padding-left: 2rem;
			padding-right: 2rem;
			padding-top: 0.7rem;
			padding-bottom: 0.7rem;
			outline: none;
			margin-left: 2rem;
		}
	}
`;

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
export default NoteScreen;
