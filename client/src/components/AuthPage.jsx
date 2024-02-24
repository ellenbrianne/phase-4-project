import styled from 'styled-components'
import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'


function AuthPage () {
    const [signedUp, setSignedUp] = useState(true)

    return (
      <>
        {signedUp ? (
          <>
            <LoginForm/>
            <Button onClick={() => setSignedUp(!signedUp)}>Need to create an account?</Button>
          </>
        ) : (
          <>
            <SignupForm/>
            <Button onClick={() => setSignedUp(!signedUp)}>Back to Login</Button>
          </>
        )
        }
      </>
    );
};

export default AuthPage;

const Button = styled.button`
  float: left;
  border-radius: 4px;
  border: 1px solid transparent;
  padding: 0.3em 1em;
  font-size: 1em;
  font-weight: 800;
  font-family: arial;
  background-color: white;
  cursor: pointer;
`;