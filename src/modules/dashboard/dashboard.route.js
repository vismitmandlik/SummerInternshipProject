const express = require('express');
const { UserModel, UserRole } = require('../users');

const router = express.Router();

// Admin Dashboard Route
router.get('/admin-dashboard', async (req, res) => {
  try {
    const username = req.query.username;
    res.render('admin-dashboard', { username: username });
  } catch (error) {
    console.error(error);
    res.render('error');
  }
});

//Student-dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const username = req.query.username;
    res.render('student-dashboard', { username: username });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error at /student-dashboard');
  }
});

module.exports = router;
