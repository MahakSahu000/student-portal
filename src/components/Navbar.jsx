import React from 'react'

import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className ="bg-blue-600 p-4 text-white flex justify-between">
       <h1 className="text-xl ml-10 font-bold ">Student Portal</h1>
        <ul className="flex gap-4">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/" className="text-red-500 hover:text-white-500">Logout</Link></li>
      </ul>
    </nav>
    
  )
}

export default Navbar  
