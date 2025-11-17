const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    profile: {
      bio: { type: String, default: '' },
      avatarUrl: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
