const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { Product, User } = require("../models/product"); 



// Admin Dashboard Route
router.get("/", async (req, res) => {
    try {
        const username = req.query.username;
        // const Product = mongoose.model("Product");
        // const data = await Product.find().sort({
        //     StudentID: 1
        // }); // Sort by StudentID
        // isAdmin(req.username)? res.render('admin-dashboard', {
        //     data
        // }):res.redirect('/')

        console.log(username)
        res.render('admin-dashboard',{ username: username})
       
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;