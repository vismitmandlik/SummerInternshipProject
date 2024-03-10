const express = require('express');
const router = express.Router();
const multer = require('multer');
const { internshipsService } = require('./intenrship.service');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', async (req, res) => {
  try {
    await internshipsService.upsertInternship(req.body);
    return res.redirect('/student-dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

get('/approval-form', async (req, res) => {
  try {
    const data = await ProductModel.findOne().lean().sort({
      StudentID: -1,
    }); // Fetch data from the database
    res.render('approval-form', {
      data,
    }); // Create an EJS file for confirmation
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
