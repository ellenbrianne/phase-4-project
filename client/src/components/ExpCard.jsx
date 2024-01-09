import React from 'react'

function ExpCard ({ experience }) {
    const { id, length, community, crowds, safety } = experience
    // there was an issue rendering each exp when i included location & user in the deconstruction..maybe bc of serializer?
    //put link in here to individual /experiences/<:id> route eventually

    return (
        <div id={id}>
            <p>Duration of experience: {length}</p>
            <ul>
                <li>Community: {community}/5</li>
                <li>Crowds: {crowds}/5</li>
                <li>Safety: {safety}/5</li>
            </ul>
        </div>
    )
}

export default ExpCard