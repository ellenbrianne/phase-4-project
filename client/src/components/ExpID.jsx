import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function ExpID ({ currUser, delExp }) {
  const [access, setAccess] = useState(false)
  const [errors, setErrors] = useState([])
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
            r.json().then(error => setErrors(error))
          }
      })
    },[])

  function handleDelete() {
    fetch(`/api/experiences/${id}`, { 
      method: "DELETE" 
    }).then(r => {
        if (r.ok) {
            delExp(ind)
            nav('/')
        } else {
            r.json().then(error => setErrors(error))
          }
      })
  }

    return (
        <Border id={id}>
          {errors&& (<h3 style={{color:'red'}}>{errors}</h3>)}
          <Card>
            {access&& (
              <>
                <Link to={`/experiences/${id}/edit`}>Edit</Link>
                <Button onClick={handleDelete}>Delete</Button>
              </>
            )}
            <h3>Location: {location.city}, {location.state}</h3>
            <p>Time spent there: {length}</p>
            <ul>
              <li>Community: {community}/5</li>
              <li>Crowds: {crowds}/5</li>
              <li>Safety: {safety}/5</li>
            </ul>
            <p>Username: {user.username}, Age: {user.age}</p>
          </Card>
        </Border>
    )
}

export default ExpID

const Card = styled.div`
  border-radius: 5px;
  border: 5px solid pink;
  display: center;
  max-width: 25%;
  padding: 0.6em 1.2em;
  a{
    color: white;
    font-family: arial;
  }
  font-family: arial;
  font-size: 110%;
`;

const Border = styled.div`
  padding: 100px;
`;

const Button = styled.button`
  float: right;
  border-radius: 6px;
  border: 1px solid transparent;
  padding: 0.3em 0.8em;
  font-size: 1em;
  font-weight: 400;
  font-family: arial;
  background-color: pink;
  cursor: pointer;
`;