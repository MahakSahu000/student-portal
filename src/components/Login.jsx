import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === 'student' && password === '1234' && email === 'Mahak@example.com') {
      navigate('/dashboard')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <form onSubmit={handleLogin} className="bg-white  rounded-lg shadow-md shadow-2xl transition-shadow duration-300 w-100 h-100">
        <h2 className="text-2xl font-bold mx-8 my-3 text-center ">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="border hover:shadow-2xl transition-shadow duration-300 my-8 mx-2 w-80 mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border my-8 mx-2 hover:shadow-2xl transition-shadow duration-300 w-80 mb-4 rounded "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border my-8 mx-2 hover:shadow-2xl transition-shadow duration-300 w-80 mb-4 rounded "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <button className="bg-blue-600 text-white  m-8 py-2 rounded w-40 hover:bg-white hover:text-blue-500 border border-blue-400 p-4 rounded  hover:shadow-2xl transition-shadow duration-300">LOGIN</button>
      </form>
    </div>
  )
}

export default Login
