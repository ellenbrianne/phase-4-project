import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'

function NavBar ({ delUser }) {

    function handleDelUser () {
        fetch('/api/logout', { method: 'DELETE' }).then(r => {
            if(r.ok){
                delUser(null)
            } else {
                null
                // nav to authpauge
            }
        })
    };

    return (
        <>
        <Header>Welcome to Your Next Move!</Header>
          <Tabs>
            <Link to="/">Home</Link>
            <Link to="/experiences">All Experiences</Link>
            <Button onClick={handleDelUser}>Logout</Button>
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
    color:white;
    font-family:Arial;
    font-size: large;
    border: 2px solid black;
    background-color: black;
    }
    a:hover{
      color: grey;
    }
`;

const Button = styled.button`
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