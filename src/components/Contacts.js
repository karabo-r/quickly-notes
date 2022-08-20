import React from "react";
import styled from "styled-components";
const Contacts = () => {
	return (
		<Container>
			<h1 className="logo">Quickly <span>Notes</span></h1>
			<div className="socials">
				<a href="#">Github</a>
				<a href="#">Twitter</a>
			</div>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	padding-left: 3rem;
	padding-right: 3rem;
	align-items: center;
	margin-bottom: 15px;
	/* padding-bottom: 2rem; */

	.logo {
		font-size: 1.7rem;
		font-weight: 600;
		display: flex;
		align-items: center;

		span{
			/* margin-left: 2rem; */
			font-size: 1.5rem;
			color: green;
		}
	}

	.socials {
		font-size: 1rem;
		font-weight: 600;
        
		a {
            opacity: 50%;
			margin-left: 20px;
			text-decoration: none;
			color: black;
			outline: none;
		}

        a:hover{
            opacity: 100%;
        }
	}
`;

export default Contacts;
