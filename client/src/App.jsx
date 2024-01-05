// import { useState } from 'react'
import Navbar from './components/NavBar'
import UserAuth from './components/UserAuth'


function App() {
  // const [user, setUser] = useState(null)

  // if (!user) return (
  //   <>
  //     <Navbar></Navbar>
  //     <UserAuth></UserAuth>
  //   </>
  // )

  return (
    <>
      <h1>Your Next Move!</h1>
      <Navbar></Navbar>
      <UserAuth></UserAuth>
    </>
  )
}

export default App
