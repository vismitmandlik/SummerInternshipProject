const express = require('express');
const router = express.Router();
const { ProductModel } = require('../models/product.model');

router.get('/', async (req, res) => {
  try {
    const studentID = req.query.StudentID;

    const student = await ProductModel.findOne({
      StudentID: studentID
    }).lean();
    res.render('student-dashboard', { student: student });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error at /student-dashboard');
  }
});

module.exports = router;
