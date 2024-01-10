import React from 'react'
import { Link } from 'react-router-dom'
import ExpCard from './ExpCard'

function Home ({ exp, currUser }) {

    const expDisplay = exp.filter(e => e.user_id == currUser.id).map(e => (
         <ExpCard key={e.id} experience={e} />
    ))

    return (
        <>
            <h1>Welcome to Your Next Move!</h1>
            <h3>My Experiences</h3>
            {expDisplay}
            <Link to="/experiences/new">Add a new Experience</Link>
        </>

    )
}

export default Home;