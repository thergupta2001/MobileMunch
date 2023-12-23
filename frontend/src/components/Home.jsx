import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, handleLogout } from '../utils/auth'

const Home = () => {
  const navigate = useNavigate()
  
  const logout = () => {
    handleLogout()
  }

  if(!isAuthenticated()){
    navigate('/')
  }

  return (
    <div>
      {isAuthenticated() ? (
        <>
          <h1>Welcome to home page</h1>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <h1>Access denied! Go to login page</h1>
          <Link to='/'>Login</Link>
        </>
      )}
    </div>
  )
}

export default Home
