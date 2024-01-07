// import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'


function AuthPage ({ addUser }) {
    const [signedUp, setSignedUp] = useState(true)
    // const nav = useNavigate()

    return (
      <>
        {signedUp ? (
          <>
            <LoginForm setSignedUp={setSignedUp} addUser={addUser} />
            <button onClick={() => setSignedUp(!signedUp)}>Need to create an account?</button>
          </>
        ) : (
          <>
            <SignupForm setSignedUp={setSignedUp} addUser={addUser} />
            <button onClick={() => setSignedUp(!signedUp)}>Back to Login</button>
          </>
        )
        }
      </>
    );
};

export default AuthPage;