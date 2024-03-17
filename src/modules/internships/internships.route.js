const express = require('express');
const multer = require('multer');
const { internshipsService } = require('./internship.service');
const { InternshipModel } = require('./internship.schema');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const internships = await InternshipModel.find()
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
    const data = await ProductModel.findOne().lean().sort({ StudentID: -1 });
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

module.exports = router;
