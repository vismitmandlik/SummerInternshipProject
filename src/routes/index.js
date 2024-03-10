const express = require('express');
const router = express.Router();
const { ProductModel, UserModel } = require('../models');

// Home Route
router.get('/', async (req, res) => {
  try {
    const data = await ProductModel.find().sort({
      StudentID: -1
    });
    res.render('login', { data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error at get /');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; 
    const data = await UserModel.findOne({ username: username });

    if (data.role == 'faculty' && data.password == password) {
      res.render('admin-dashboard', { username: username });
    }

    else if (data && data.password == password) {
      const student = await ProductModel.findOne({
        StudentID: username
      }).lean();
      res.render('student-dashboard', { student: student, username: username });
    }

    // User not found
    else {
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
