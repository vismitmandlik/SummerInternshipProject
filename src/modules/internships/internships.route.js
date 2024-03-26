const express = require('express');
const multer = require('multer');
const { internshipsService } = require('./internship.service');
const { InternshipModel } = require('./schemas/internship.schema');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const internshipsQuery = {};

    const { search } = req.query;
    if (search) {
      internshipsQuery.$or = [
        { 'student.enrollmentNumber': { $regex: search, $options: 'i' } },
        { 'student.fullName': { $regex: search, $options: 'i' } },
      ];
    }

    const internships = await InternshipModel.find(internshipsQuery)
      .sort({ 'student.enrollmentNumber': -1 })
      .lean();
    return res.render('handle-requests', { internships });
  } catch (err) {
    console.error(err);
  }
});

router.post('/', async (req, res) => {
  try {
    await internshipsService.upsertInternship(req.body);
    return res.redirect('/student-dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/approval-form', async (req, res) => {
  try {
    const data = await InternshipModel.findOne().lean().sort({ StudentID: -1 });
    res.render('approval-form', {
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post(
  '/upload-certificate/',
  upload.single('certificate'),
  async (req, res) => {
    try {
      const enrollmentNumber = req.query.StudentId;
      const certificate = req.file.buffer;
      await this.internshipsService.uploadCertificate(
        enrollmentNumber,
        certificate
      );
      res.status(200).json({ message: 'Certificate uploaded successfully' });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'Internal Server Error at /upload-certificate' });
    }
  }
);

router.get('/:enrollmentNumber', async (req, res) => {
  try {
    const { enrollmentNumber } = req.params;
    console.log(enrollmentNumber);

    const internship = await InternshipModel.findOne({
      'student.enrollmentNumber': enrollmentNumber,
    }).lean();

    if (!internship) {
      return res.status(404).send('Student not found');
    }
    res.render('view-details', { internship });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
