import React from 'react'
import { Link } from 'react-router-dom'

function Home () {

    return (
        <>
            <h1>Welcome to Your Next Move!</h1>
            <Link to="/experiences/new">Add a new Experience</Link>
        </>

    )
}

export default Home;