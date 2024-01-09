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
            <Link to="/">Home</Link>
            <Link to="/experiences">Other Users' Experiences</Link>
            <button onClick={handleDelUser}>Logout</button>
        </>
        
    )
};

export default NavBar