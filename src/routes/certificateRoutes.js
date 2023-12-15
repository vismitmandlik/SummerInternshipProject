const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product, User } = require('../models/product'); 

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage for storing files as buffers
const upload = multer({ storage: storage });


router.use('/public/css', express.static(__dirname + '/public/css'));
// Render the certification page
router.get('/completion-certificate/', async (req, res) => {
    const StudentId = req.query.StudentId;  // Use req.query to get query parameters
    const student = await Product.findOne({ StudentId: StudentId });
    res.render('completion-certificate', { StudentId });
});

// Certificate Uploading Route
router.post('/upload-certificate/', upload.single('certificate'), async (req, res) => {
    try {
        const StudentId = req.body.StudentId;  // Use req.body to get data from the request body
        const student = await Product.findOne({ StudentID: StudentId });
        console.log(student);
        if (!student) {
            console.log(student);
            return res.status(404).json({ error: 'Student not found' });
        }

        // Save the certificate to the student document
        student.certificate = req.file.buffer;
        await student.save();

        res.status(200).json({ message: 'Certificate uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error at /upload-certificate' });
    }
});

// Route to render the form
router.get('/upload-certificate/', async (req, res) => {
    try {
        const StudentId = req.body.StudentId;
        // Fetch student data from your database
        const student = await Product.findOne({ StudentID: StudentId });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.render('completion-certificate', { student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a route to serve the uploaded certificate
router.get('/certificate-preview/:StudentId', async (req, res) => {
    try {
      const StudentId = req.params.StudentId;
      const student = await Product.findOne({ StudentID: StudentId });
  
      if (!student || !student.certificate) {
        return res.status(404).json({ error: 'Certificate not foun' });
      }
  
      // Set appropriate content type based on the certificate file type (e.g., image/jpeg, application/pdf, etc.)
      res.set('Content-Type', 'application/pdf');
      res.send(student.certificate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
