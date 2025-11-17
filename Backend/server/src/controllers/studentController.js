const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Grade = require('../models/Grade');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash').populate('courses');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, profile } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { ...(name && { name }), ...(profile && { profile }) } },
      { new: true }
    ).select('-passwordHash');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('courses');
    res.json(user?.courses || []);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const list = await Assignment.find({ owner: req.user.id }).populate('course');
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getGrades = async (req, res) => {
  try {
    const list = await Grade.find({ owner: req.user.id }).populate('course');
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCounts = async (req, res) => {
  try {
    const assignmentsDue = await Assignment.countDocuments({ owner: req.user.id, status: 'due' });
    const gradesCount = await Grade.countDocuments({ owner: req.user.id });
    res.json({ assignmentsDue, gradesCount });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.autoEnrollDefaults = async (req, res) => {
  try {
    const defaults = [
      { code: 'CS101', title: 'Intro to Computer Science', description: 'Basics of computing' },
      { code: 'MATH201', title: 'Discrete Mathematics', description: 'Sets, graphs, logic' },
      { code: 'ENG150', title: 'Academic Writing', description: 'Writing fundamentals' },
    ];
    // Ensure defaults exist
    const ids = [];
    for (const c of defaults) {
      let course = await Course.findOne({ code: c.code });
      if (!course) course = await Course.create(c);
      ids.push(course._id);
    }
    // Add to user if not already present
    const user = await User.findById(req.user.id);
    const current = new Set(user.courses.map((id) => id.toString()));
    const toAdd = ids.filter((id) => !current.has(id.toString()));
    if (toAdd.length) {
      user.courses.push(...toAdd);
      await user.save();
    }
    const populated = await User.findById(req.user.id).populate('courses').select('courses');
    res.json({ ok: true, enrolled: populated.courses });
  } catch (err) {
    console.error('autoEnrollDefaults error:', err.message || err);
    res.status(500).json({ message: 'Server error' });
  }
};
