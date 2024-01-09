import React from 'react'
import ExpCard from './ExpCard'

function ExpContainer ({ experiences }) {

    const exDisplay = experiences.map(e => (
        <ExpCard key ={e.id} experience={e} />
    ))
    
    
    return (
        <>
            {exDisplay}
        </>
    )
}

export default ExpContainer