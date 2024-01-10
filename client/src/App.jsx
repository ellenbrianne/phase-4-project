import React, { useState, useEffect } from 'react'
import Navbar from './components/NavBar'
import AuthPage from './components/AuthPage'
import { Routes, Route } from 'react-router-dom'
import ExpContainer from './components/ExpContainer'
import Home from './components/Home'
import ExpForm from './components/ExpForm'
import ExpInd from './components/ExpInd'


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

  function addExp (e) {
    setExp((currExp) => [...currExp, e])
  }

  const addUser = (u) => setUser(u)
  // change this to context to avoid drilling through AuthPage?

  if (!user) return (
    <>
      <h1>Signup or Login to see Your Next Move!</h1>
      <AuthPage addUser={addUser}/>
    </>
  )

  return (
    <>
      <Navbar delUser={setUser}/>
      <Routes>
        <Route path="/experiences/new" element={<ExpForm addExp={addExp} user={user}/>} />
        <Route path="/experiences/:id" element={<ExpInd />} />
        <Route path="/experiences" element={<ExpContainer experiences={exp}/>} />
        <Route exact path='/' element={<Home exp={exp} currUser={user}/>} />
      </Routes>
    </>
  )
}

export default App
