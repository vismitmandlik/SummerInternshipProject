const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {getAllProducts,getAllProductsTesting,createResponse} = require("../controllers/products")


// // Route to handle form submission and create a new product
// router.post("/create", async (req, res) => {
//     try {
//       // Extract data from the request body
//       const {
//         StudentID,
//         StudentName,
//         TypeofInternship,
//         Counsellor_InternalGuide,
//         CompanyName,
//         CompanyAddress,
//         CompanyCity,
//         CompanyState,
//         HRemailID,
//         HRphonenumber,
//         TypeofProject,
//         ProjectTitle,
//         ToolsandTechnology
//       } = req.body;
  
//       // Create a new Product document
//       const newProduct = new Product({
//         StudentID,
//         StudentName,
//         TypeofInternship,
//         Counsellor_InternalGuide,
//         CompanyName,
//         CompanyAddress,
//         CompanyCity,
//         CompanyState,
//         HRemailID,
//         HRphonenumber,
//         TypeofProject,
//         ProjectTitle,
//         ToolsandTechnology
//       });
  
//       // Save the new product to the database
//       await newProduct.save();
  
//       // Send a success response with a message and the created data
//     createResponse(res, 200, "Product created successfully", newProduct);
//     } catch (error) {
//     console.error(error);
//     // Send an error response with an error message
//     createResponse(res, 500, "Internal Server Error");
//     }
// });

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
            res.status(401).send("Invalid StudentID");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
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
      res.status(500).send("Internal Server Error");
  }
});

module.exports = router;