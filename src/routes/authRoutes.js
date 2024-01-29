const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ProductModel, UserModel } = require('../models');

router.get('/', async (req, res) => {
  try {
    const data = await ProductModel.findOne().lean().sort({
      StudentID: -1
    });
    if (true) {
      res.render('register-faculty', {
        data
      });
    } else {
      res.redirect('admin-dashboard');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error at .get/register-faculty');
  }
});

// Register Faculty Route (accessible by admin)
router.post('/', async (req, res) => {
  try {
    const { username, role, password } = req.body;

    // TODO: Check if the current user has admin privileges to access this route
    if (true) {
      const faculty = new UserModel({ username, role: 'faculty', password });
      await faculty.save();

      res.redirect('/admin-dashboard');
    } else {
      res.status(403).send('Access denied');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
