const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Product } = require("../models/product"); 
const passport = require('passport');



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


// // Define the authentication route
// router.post("/login", passport.authenticate('local', {
//     successRedirect: '/student-dashboard', // Redirect to the student dashboard on success
//     failureRedirect: '/', // Redirect back to the login page on failure
//     failureFlash: true,
//   }));
  
//   // Ensure the username is set in the session after successful login
//   router.post("/login", (req, res) => {
//     // req.user.username should contain the authenticated user's username
//     req.login(req.user, (err) => {
//       if (!err) {
//         // Redirect to the student dashboard after setting the session
//         res.redirect('/student-dashboard');
//       }
//     });
//   });

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