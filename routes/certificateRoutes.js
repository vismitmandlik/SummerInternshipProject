const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product, User } = require('../models/product'); // Adjust the path based on your actual models

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage for storing files as buffers
const upload = multer({ storage: storage });



// Render the certification page
router.get('/completion-certificate/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    const student = await Product.findById(studentId);
    res.render('completion-certificate', { studentId }); // Assuming you have a certification.ejs file
  });



// Certificate Uploading Route
router.post('/upload-certificate/:studentId', upload.single('certificate'), async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Product.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Save the certificate to the student document
    student.certificate = req.file.buffer;
    await student.save();

    res.status(200).json({ message: 'Certificate uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to render the form
router.get('/upload-certificate/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    // Fetch student data from your database
    const student = await Product.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.render('completion-certificate', { student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get the certificate
router.get('/get-certificate/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);

    if (!student || !student.certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    // Send the certificate as a response
    res.setHeader('Content-Type', 'application/pdf'); // Adjust content type based on your file type
    res.send(student.certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
