import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
     const [formData, setFormData] = useState({
          username: '',
          email: '',
          password: ''
     })

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value })
     }

     const handleSubmit = async (e) => {
          e.preventDefault()

          try {
               const response = await axios.post('http://localhost:8080/register', {
                    username: String(formData.username),
                    email: String(formData.email),
                    password: String(formData.password)
               })

               console.log('User registered successfully ', response.data)
          } catch (err) {
               console.error('Error registering user:', err.message);
          }
     }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type='text' name='username' value={formData.username} onChange={handleChange} required />

          <label>Email</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} required />

          <label>Password</label>
          <input type='password' name='password' value={formData.password} onChange={handleChange} required />

          <button type='submit'>Register</button>
      </form>

      <p>Already have an account? Login</p>
    </div>
  )
}

export default Register
