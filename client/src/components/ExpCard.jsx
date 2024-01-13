import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'

function ExpCard ({ experience }) {
    const { id, length, location } = experience
   
    return (
        <Container id={id}>
            <Card>
                <Link to={`/experiences/${id}`}>More</Link>
                  <h3>Location: {location.city}, {location.state}</h3>
                  <h4>Time spent there: {length}</h4>
            </Card>
        </Container>
    )
}

export default ExpCard

const Card = styled.div`
    grid-template-rows: max-content 150px 1fr;
    border-radius: 5px;
    border: 5px solid pink;
    display: center;
    padding: 0.6em 1.2em;
    a{
      color: pink;
      font-family: arial;
      font-size: 100%;
    }
    font-family: arial;
    font-size: 120%;
`;

const Container = styled.div`
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 10px;
    padding-bottom: 50px;
    float: left;
    padding-right: 70px;
    padding-top: 70px;
`;