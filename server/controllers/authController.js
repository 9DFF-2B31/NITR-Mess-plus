const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register a new student
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { rollNo, password, name, messName, photoUrl } = req.body;

    // Check if student already exists
    const studentExists = await Student.findOne({ rollNo });
    if (studentExists) {
      return res
        .status(400)
        .json({ message: 'Student already exists with this roll number' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create student (store only Cloudinary URL)
    const student = await Student.create({
      rollNo,
      password: hashedPassword,
      name,
      messName,
      photoURL: photoUrl || '' 
    });

    if (student) {
      res.status(201).json({
        _id: student._id,
        rollNo: student.rollNo,
        name: student.name,
        messName: student.messName,
        photoURL: student.photoURL, // just URL string
        tokens: student.tokens,
        role: student.role,
        token: generateToken(student._id)
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// @desc    Login student/admin
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { rollNo, password } = req.body;
    // Find student
    const student = await Student.findOne({ rollNo });
    if (!student) {
      return res.status(401).json({ message: 'Invalid roll number or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid roll number or password' });
    }

    res.json({
      _id: student._id,
      rollNo: student.rollNo,
      name: student.name,
      messName: student.messName,
      photo: student.photo,
      tokens: student.tokens,
      role: student.role,
      token: generateToken(student._id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select('-password');
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  login,
  getMe
};