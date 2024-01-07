import { useState, useEffect } from 'react'
import Navbar from './components/NavBar'
import AuthPage from './components/AuthPage'


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser()
  },[])

  const addUser = (u) => setUser(u)

  if (!user) return (
    <>
      <Navbar/>
      <AuthPage addUser={addUser}/>
    </>
  )

  function getUser () {
    fetch('/api/auth')
    .then(r => {
      if(r.ok){
        r.json()
        .then(userObj => setUser(userObj))
      } else {
        setUser(null)
      }
    })
  }

  return (
    <>
      <h1>Your Next Move!</h1>
    </>
  )
}

export default App
