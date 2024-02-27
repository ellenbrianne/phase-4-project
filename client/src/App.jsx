import { createGlobalStyle, styled } from 'styled-components'
import React, { useEffect } from 'react'
import Navbar from './components/NavBar'
import AuthPage from './components/AuthPage'
import { Routes, Route } from 'react-router-dom'
import ExpContainer from './components/ExpContainer'
import Home from './components/Home'
import ExpForm from './components/ExpForm'
import ExpID from './components/ExpID'
import EditForm from './components/EditForm'
import { useDispatch } from 'react-redux'
import { setUser } from './slices/userSlice'
import { useSelector } from 'react-redux'
import { setExp } from './slices/expSlice'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)

  useEffect(() => {
    getUser()
    getExp()
  },[])

  function getUser () {
    fetch('/api/auth')
    .then(r => {
      if(r.ok){
        r.json()
        .then(userObj => dispatch(setUser(userObj)))
      } 
    })
  }

  function getExp () {
    fetch('/api/experiences')
    .then(r => r.json())
    .then((arr) => dispatch(setExp(arr)))
  }

  if (!user) return (
    <>
      <GlobalStyle />
      <Header>Welcome to Your Next Move!</Header>
      <Prompt>Signup or Login to see Your Next Move...</Prompt>
      <AuthPage/>
    </>
  )

  return (
    <>
      <GlobalStyle />
      <Navbar/>
      <Routes>
        <Route 
          path="/experiences/new" 
          element={<ExpForm/>} 
        />
        <Route 
          path="/experiences/:id/edit" 
          element={<EditForm/>} 
        />
        <Route 
          path="/experiences/:id" 
          element={<ExpID/>} 
        />
        <Route 
          path="/experiences" 
          element={<ExpContainer/>} 
        />
        <Route 
          exact path='/' 
          element={<Home/>} 
        />
        <Route
          path='/auth'
          element={<AuthPage />}
        />
      </Routes>
    </>
  )
}

export default App


const GlobalStyle = createGlobalStyle`
    body{
      background-color: black; 
      color:white;
    }
    ` 

const Header = styled.h1`
  font-size: 350%;
  font-family: arial;
  color: white;
`;

const Prompt = styled.h2`
    padding-bottom: 50px;
    color: red;
`;