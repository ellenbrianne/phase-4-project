import React from 'react'
import ExpCard from './ExpCard'
import { useSelector } from 'react-redux'

function ExpContainer () {

    const exp = useSelector(state => state.exp.arr)  

    const expDisplay = exp.map(e => (
            <ExpCard key={e.id} experience={e} />
        ))

    return (
        <>
        {expDisplay}
        </>
          
    )
}

export default ExpContainer