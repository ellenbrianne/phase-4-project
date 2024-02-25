import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
import ExpCard from './ExpCard'
import { useSelector } from 'react-redux'

function Home () {

    const user = useSelector(state => state.user.value) 
    const exp = useSelector(state => state.exp.value)

    const expDisplay = exp.filter(e => e.user_id == user.id).map(e => (
         <ExpCard key={e.id} experience={e} />
    ))

    return (
        <>
            <Header2>My Experiences:</Header2>
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
    font-family: arial;
    font-size: medium;
    font-weight: 420;
    border-radius: 6px;
    padding: 0.3em 0.9em;
    background-color: pink;
    }
`;

const Header2 = styled.h2`
    padding-top: 50px;
    font-family: arial;
`;