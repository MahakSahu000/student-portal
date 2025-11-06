import React from 'react'

const Courses = () => {
  const courses = [
    { name: 'Web Development', instructor: 'Miss. Neeta Sharma' , Email :'N123@gmail.com'},
    { name: 'Data Science', instructor: 'Ms. Ravi Rao' , Email :'R183@gmail.com'},
    { name: 'AI & ML', instructor: 'Dr. Himanshu Singh', Email :'H193@gmail.com' },
    { name: 'Soft Skills', instructor: 'Mr. Tarun Mishra', Email :'T103@gmail.com' },
    { name: 'DSA', instructor: 'Mr. Ritik Pandit' , Email :'R283@gmail.com'},
    { name: 'Agile ', instructor: 'Miss. Ambika Garg', Email :'A163@gmail.com' },
    
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>
      <ul>
        {courses.map((c, i) => (
          <li key={i} className="border p-3 rounded mb-2 hover:shadow-xl transition-shadow duration-300">
            <b>{c.name}</b> — {c.instructor} --- <b>   Email</b> : {c.Email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Courses
