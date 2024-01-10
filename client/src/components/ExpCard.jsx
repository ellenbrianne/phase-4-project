import React from 'react'
import { Link } from 'react-router-dom'

function ExpCard ({ experience }) {
    const { id, length, location } = experience
   
    return (
        <div id={id}>
            <Link to={`/experiences/${id}`}>
                <p>Location: {location.city}, {location.state}</p>
                <p>Duration of experience: {length}</p>
            </Link>
        </div>
    )
}

export default ExpCard