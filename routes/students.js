const express = require('express');
const router = express.Router();
const cors = require('cors');
const Student = require('../models/student');
const getStudent = require('../middleware/getStudent');

router.use(cors());

router.use(express.json());

//get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create a student
router.post('/', async (req, res) => {
  const student = new Student(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
    console.log('...A new student was created!');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get a student
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student);
});

//update a student
router.patch('/:id', getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.courses != null) {
    res.student.courses = req.body.courses;
  }
  if (req.body.gpa != null) {
    res.student.gpa = req.body.gpa;
  }
  if (req.body.email != null) {
    res.student.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.student.phone = req.body.phone;
  }
  if (req.body.address != null) {
    res.student.address = req.body.address;
  }
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete a student
router.delete('/:id', getStudent, async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
