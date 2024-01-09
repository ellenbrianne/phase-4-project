import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'


function AuthPage ({ addUser }) {
    const [signedUp, setSignedUp] = useState(true)

    return (
      <>
        {signedUp ? (
          <>
            <LoginForm addUser={addUser} />
            <button onClick={() => setSignedUp(!signedUp)}>Need to create an account?</button>
          </>
        ) : (
          <>
            <SignupForm addUser={addUser} />
            <button onClick={() => setSignedUp(!signedUp)}>Back to Login</button>
          </>
        )
        }
      </>
    );
};

export default AuthPage;