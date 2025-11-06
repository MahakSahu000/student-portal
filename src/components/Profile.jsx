import React from 'react'

const Profile = () => {
  const student = {
    name: 'Mahak Sahu',
    roll: 'STU2025',
    branch: 'Computer Science',
    email: 'mahak@example.com',
    
  }

  return (
    <div className="p-6  ">
      <h2 className="text-2xl font-bold mb-4 ">Student Profile</h2>
      <div className="border p-4 w-100 ml-140 h-100 rounded hover:shadow-2xl transition-shadow duration-300  justify-center">
        <p className='m-5'><b>Name:</b> {student.name}</p>
        <p className='m-5'><b>Roll No:</b> {student.roll}</p>
        
        <p className='m-5'><b>Branch:</b> {student.branch}</p>
        <p className='m-5'><b>Email:</b> {student.email}</p>
      </div>
    </div>
  )
}

export default Profile
