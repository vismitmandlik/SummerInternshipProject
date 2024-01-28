const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Product, User } = require('../models/product');

// Home Route
router.get('/', async (req, res) => {
  try {
    const Product = mongoose.model('Product');
    const data = await Product.find().sort({
      StudentID: -1
    }); // Sort by StudentID

    // Render the EJS template with the data
    res.render('login', {
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error at get /');
  }
});

// login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; // Assuming "username" is the StudentID
    const data = await User.findOne({ username: username });

    // check for faculty
    if (data.role == 'faculty' && data.password == password) {
      res.render('admin-dashboard', { username: username });
    }

    // check for student
    else if (data && data.password == password) {
      const student = await Product.findOne({
        StudentID: username
      }).lean();
      res.render('student-dashboard', { student: student, username: username });
      // res.render('student-dashboard', { username: username });
    }

    // User not found
    else {
      // StudentID not found, display an error message
      console.log(`Unauthorized ID: ${username} or Password: ${password}`);
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.redirect('/');
  }
});

module.exports = router;
