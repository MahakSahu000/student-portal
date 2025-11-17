const router = require('express').Router();
const auth = require('../middleware/auth');
const { getProfile, updateProfile, getMyCourses, autoEnrollDefaults, getAssignments, getGrades, getCounts } = require('../controllers/studentController');

router.get('/profile', auth, getProfile);
router.patch('/profile', auth, updateProfile);
router.put('/profile', auth, updateProfile);
router.get('/courses', auth, getMyCourses);
router.get('/assignments', auth, getAssignments);
router.get('/grades', auth, getGrades);
router.get('/counts', auth, getCounts);
router.post('/auto-enroll', auth, autoEnrollDefaults);

module.exports = router;
