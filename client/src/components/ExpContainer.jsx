import React from 'react'
import ExpCard from './ExpCard'

function ExpContainer ({ experiences }) {

    const expDisplay = experiences.map(e => (
        <ExpCard key ={e.id} experience={e} />
    ))
    
    
    return (
        <>
            {expDisplay}
        </>
    )
}

export default ExpContainer