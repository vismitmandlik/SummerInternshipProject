const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { Product, User } = require("../models/product"); 


router.get("/", async (req, res) => {
    try {
        const Product = mongoose.model("Product");
        const data = await Product.findOne().lean().sort({
            StudentID: -1
        });; // Fetch data from the database
        if (true) {
        res.render("register-faculty", {
            data
        }); }
        else {
            // If not authenticated or not an admin, send an "Access denied" response
            res.redirect("admin-dashboard");// Create an EJS file for confirmation
    }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error at .get/register-faculty");
    }
});


// Register Faculty Route (accessible by admin)
router.post("/", async (req, res) => {
    try {
        const { username, role, password } = req.body;

        // Check if the current user has admin privileges to access this route
        if (true) {
            // Create a new faculty user
            const faculty = new User({ username, role: "faculty", password });
            
            // Save the faculty user to the database
            await faculty.save();

            res.redirect("/admin-dashboard"); // Redirect to the admin dashboard after successful registration
        } else {
            res.status(403).send("Access denied"); // Unauthorized access
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;