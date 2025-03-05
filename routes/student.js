const express = require('express');

const router = express.Router();

const studentController = require('../controllers/studentController');
const isAuth = require('../middleware/isAuth');

router.get('/student', isAuth, studentController.getAllStudents);
router.post('/add-student', isAuth, studentController.addStudent);
router.post('/delete-student', isAuth, studentController.deleteStudent);
router.get('/edit-student/:maSinhVien', isAuth, studentController.getEditStudent);
router.post('/update-student', isAuth, studentController.updateStudent);

module.exports = router;
