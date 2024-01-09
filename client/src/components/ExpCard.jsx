import React from 'react'

function ExpCard ({ experience }) {
    const { id, length, community, crowds, safety, location, user } = experience
    //put link in here to individual /experiences/<:id> route eventually

    return (
        <div id={id}>
            <p>Location: {location.city}, {location.state}</p>
            <p>Duration of experience: {length}</p>
            <ul>
                <li>Community: {community}/5</li>
                <li>Crowds: {crowds}/5</li>
                <li>Safety: {safety}/5</li>
            </ul>
            <p>Username: {user.username}, Age: {user.age}</p>
        </div>
    )
}

export default ExpCard