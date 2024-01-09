import React, { useState, useEffect } from 'react'
import Navbar from './components/NavBar'
import AuthPage from './components/AuthPage'


function App() {
  const [user, setUser] = useState(null)
  const [exp, setExp] = useState([])
  // might make exp context too?

  useEffect(() => {
    getUser()
    getExp()
  },[])

  function getUser () {
    fetch('/api/auth')
    .then(r => {
      if(r.ok){
        r.json()
        .then(userObj => setUser(userObj))
      } 
    })
  }

  function getExp () {
    fetch('/api/experiences')
    .then(r => r.json())
    .then((exp) => setExp(exp))
  }

  const addUser = (u) => setUser(u)
  // change this to context to avoid drilling through AuthPage?

  if (!user) return (
    <>
      <h1>Your Next Move!</h1>
      <AuthPage addUser={addUser}/>
    </>
  )

  return (
    <>
      <h1>Your Next Move!</h1>
      <Navbar delUser={setUser} experiences={exp}/>
    </>
  )
}

export default App
