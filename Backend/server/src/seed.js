require('dotenv').config();
const connectDB = require('./config/db');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Course = require('./models/Course');
const Assignment = require('./models/Assignment');
const Grade = require('./models/Grade');

(async function run() {
  await connectDB();
  await Promise.all([
    Assignment.deleteMany({}),
    Grade.deleteMany({}),
    Course.deleteMany({})
  ]);

  const courses = await Course.insertMany([
    { code: 'CS101', title: 'Intro to Computer Science', description: 'Basics of computing' },
    { code: 'MATH201', title: 'Discrete Mathematics', description: 'Sets, graphs, logic' },
    { code: 'ENG150', title: 'Academic Writing', description: 'Writing fundamentals' },
  ]);

  let user = await User.findOne({ email: 'demo@student.local' });
  if (!user) {
    const passwordHash = await bcrypt.hash('password123', 10);
    user = await User.create({ name: 'Demo Student', email: 'demo@student.local', passwordHash, courses: courses.map(c => c._id) });
  }

  const now = new Date();
  await Assignment.insertMany([
    { title: 'CS101 — Hello World', dueDate: new Date(now.getTime() + 3*24*60*60*1000), status: 'due', owner: user._id, course: courses[0]._id },
    { title: 'MATH201 — Graph Worksheet', dueDate: new Date(now.getTime() + 5*24*60*60*1000), status: 'due', owner: user._id, course: courses[1]._id },
    { title: 'ENG150 — Essay Draft', dueDate: new Date(now.getTime() - 2*24*60*60*1000), status: 'submitted', owner: user._id, course: courses[2]._id },
  ]);

  await Grade.insertMany([
    { owner: user._id, course: courses[0]._id, score: 88, total: 100, letter: 'B+' },
    { owner: user._id, course: courses[1]._id, score: 94, total: 100, letter: 'A' },
  ]);

  console.log('\nSeed complete. Demo credentials:');
  console.log('  Email: demo@student.local');
  console.log('  Password: password123');
  process.exit(0);
})();
