import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'

function ExpCard ({ experience }) {
    const { id, length, location } = experience
   
    return (
        <Container id={id}>
            <Card>
                <Link to={`/experiences/${id}`}>
                    <p>Location: {location.city}, {location.state}</p>
                    <p>Duration of experience: {length}</p>
                </Link>
            </Card>
        </Container>
    )
}

export default ExpCard

const Card = styled.div`
    grid-template-rows: max-content 150px 1fr;
    border-radius: 5px white;
    border: 2px solid pink;
    display: flex;
    padding: 0.6em 1.2em;
    a{
      color: white;
      font-family: arial;
    }
`;

const Container = styled.div`
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 10px;
    padding-bottom: 50px;
    float: left;
    padding-right: 50px;
`;