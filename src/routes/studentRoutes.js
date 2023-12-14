const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { Product, User } = require("../models/product"); 




router.get("/", async (req, res) => {
    try {
        const Product = mongoose.model("Product");
        const studentID = req.query.StudentID; // Get StudentID from the query parameter

        // Fetch the details of the specific student using the StudentID
        const student = await Product.findOne({
            StudentID: studentID
        }).lean();
            res.render('student-dashboard',{student : student});
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error at /student-dashboard");
    }
});

 


module.exports = router;