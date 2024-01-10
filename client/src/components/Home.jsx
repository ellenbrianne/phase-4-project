import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
import ExpCard from './ExpCard'

function Home ({ exp, currUser }) {

    const expDisplay = exp.filter(e => e.user_id == currUser.id).map(e => (
         <ExpCard key={e.id} experience={e} />
    ))

    return (
        <>
            <h3>My Experiences</h3>
            {expDisplay}
            <AddLink>
                <Link to="/experiences/new">Add a new Experience</Link>
            </AddLink>
        </>

    )
}

export default Home;

const AddLink = styled.div`
    display: left;
    align-items: center;
    padding-top: 50px;
    justify-content: space-evenly;
    width: 15%;
    a{
    color:black;
    font-family:Arial;
    font-size: medium;
    font-weight: 420;
    border-radius: 6px;
    padding: 0.3em 0.9em;
    background-color: pink;
    }
`;