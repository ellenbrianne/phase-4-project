import React from 'react'
import ExpCard from './ExpCard'

function ExpContainer ({ experiences }) {
    
    
    return (
        <>
            {experiences.map(e => <ExpCard key={e.id} experience={e} />)}
        </>
    )
}

export default ExpContainer