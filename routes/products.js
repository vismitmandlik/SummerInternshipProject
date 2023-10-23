const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Product } = require("../models/product"); 



router.get('/search-student', (req, res) => {
  const { studentID } = req.query;
  const student = students.find((s) => s.StudentID === studentID);
  res.json(student);
});

// Define the authentication route
router.post("/login", async (req, res) => {
    try {
        const { username } = req.body; // Assuming "username" is the StudentID

        // Check if the provided username (StudentID) exists in the database
        const student = await Product.findOne({ StudentID: username });

        if (student) {
            // StudentID exists, proceed with authentication
            // You can add more authentication logic here if needed

            // Redirect to a dashboard or profile page upon successful authentication
            res.redirect("/student-dashboard"); // Change the URL as needed
        } else {
            // StudentID not found, display an error message
            console.log("Unauthorized ID ")
            res.redirect("/")
        }
    } catch (error) {
        console.error(error);
        res.status(500);
    }
});

// Home Route
router.get("/", async (req, res) => {
  try {
      const Product = mongoose.model("Product");
      const data = await Product.find().sort({
          StudentID: -1
      }); // Sort by StudentID

      // Render the EJS template with the data
      res.render("login", {
          data
      });
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error at get /");
  }
});

module.exports = router;