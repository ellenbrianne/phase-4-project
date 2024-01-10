import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ExpID ({ currUser, delExp }) {
    const [access, setAccess] = useState(false)
    const [ind, setInd] = useState({
        id:'',
        length:'',
        location: {
            city: '',
            state:''
        },
        community:'',
        crowds:'',
        safety:'',
        user: {
            username:'',
            age:''
        }
    })
    const params = useParams()
    const nav = useNavigate()

    const { id, length, location, community, crowds, safety, user } = ind

    useEffect(() => {
        fetch(`/api/experiences/${params.id}`)
        .then(r => {
            if (r.ok) {
                r.json().then((obj) => {
                    setInd(obj)
                    if (currUser.id === obj.user_id) {
                        setAccess(true)
                    }
                })
            } else {
                null 
                // set errors eventually
            }
        })
    },[])

    function handleEdit() {
        null
    }

    function handleDelete() {
        fetch(`/api/experiences/${id}`, { 
            method: "DELETE" 
        }).then(r => {
            if (r.ok) {
                delExp(ind)
                nav('/')
            } else {
                null
                //errors
            }
        })
    }

    return (
        <div id={id}>
            {access&& (
                <>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
            <h3>Location: {location.city}, {location.state}</h3>
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

export default ExpID