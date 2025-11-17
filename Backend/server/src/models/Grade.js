const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    letter: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Grade', GradeSchema);