const express = require("express");
const router = express.Router();
const {getAllProducts,getAllProductsTesting,createResponse} = require("../controllers/products")

// router.route("/").get(getAllProducts);
// Render the admin.ejs template for the home route
router.get("/", (req, res) => {
    res.render("admin");
  });


router.route("/testing").get(getAllProductsTesting);
router.route("/create").get(createResponse);

// Route to handle form submission and create a new product
router.post("/create", async (req, res) => {
    try {
      // Extract data from the request body
      const {
        StudentID,
        StudentName,
        TypeofInternship,
        Counsellor_InternalGuide,
        CompanyName,
        CompanyAddress,
        CompanyCity,
        CompanyState,
        HRemailID,
        HRphonenumber,
        TypeofProject,
        ProjectTitle,
        ToolsandTechnology
      } = req.body;
  
      // Create a new Product document
      const newProduct = new Product({
        StudentID,
        StudentName,
        TypeofInternship,
        Counsellor_InternalGuide,
        CompanyName,
        CompanyAddress,
        CompanyCity,
        CompanyState,
        HRemailID,
        HRphonenumber,
        TypeofProject,
        ProjectTitle,
        ToolsandTechnology
      });
  
      // Save the new product to the database
      await newProduct.save();
  
      // Send a success response with a message and the created data
    createResponse(res, 200, "Product created successfully", newProduct);
    } catch (error) {
    console.error(error);
    // Send an error response with an error message
    createResponse(res, 500, "Internal Server Error");
    }
});

module.exports = router;