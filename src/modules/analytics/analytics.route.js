const express = require('express');
const { InternshipModel } = require('../internships/schemas/internship.schema');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const internships = await InternshipModel.find()
      .sort({ 'student.enrollmentNumber': -1 })
      .lean();
    res.render('analytics', { internships });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/search-students', async (req, res) => {
  try {
    const { query } = req.query;

    if (query) {
      const students = await ProductModel.find({
        $or: [
          { StudentID: { $regex: query, $options: 'i' } },
          { StudentName: { $regex: query, $options: 'i' } },
        ],
      });

      return res.render('analytics', {
        students,
      });
    } else {
      const students = await InternshipModel.find({});
      return res.render('analytics', {
        students,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error at /search-student');
  }
});

module.exports = router;
