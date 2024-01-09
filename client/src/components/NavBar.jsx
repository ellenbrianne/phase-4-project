import React from 'react'
import ExpContainer from './ExpContainer'

function NavBar ({ delUser, experiences }) {

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
            <h1>Home</h1>
            <h1>Other Users' Experiences</h1>
            <ExpContainer experiences={experiences} />
            <button onClick={handleDelUser}>Logout</button>
        </>
        
    )
};

export default NavBar