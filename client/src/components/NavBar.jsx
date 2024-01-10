import styled from 'styled-components'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavBar ({ delUser }) {

    const nav = useNavigate()

    function handleDelUser () {
        fetch('/api/logout', { method: 'DELETE' }).then(r => {
            if(r.ok){
                delUser(null)
                nav('/auth')
            } else {
                null
                // errors
            }
        })
    };

    return (
        <>
        <Header>Welcome to Your Next Move!</Header>
          <Button onClick={handleDelUser}>Logout</Button>
          <Tabs>
            <Link to="/">Home</Link>
            <Link to="/experiences">All Experiences</Link>
          </Tabs>
        </>
        
        
    )
};

export default NavBar

const Tabs = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 25%;
    a{
    color:black;
    font-family:Arial;
    font-size: large;
    font-weight: 550;
    border-radius: 6px;
    padding: 0.5em 1.2em;
    background-color: pink;
    }
`;

const Button = styled.button`
    float: right;
    border-radius: 6px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 800;
    font-family: arial;
    background-color: pink;
    cursor: pointer;
`;
   
const Header = styled.h1`
    font-size: 350%;
    font-family: arial;
    color: white;
`