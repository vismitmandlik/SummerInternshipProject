const express = require('express');
const router = express.Router();
const { User } = require("../models/product");

router.get("/change-password", async (req, res) => {
    try {
        res.render("change-password");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error at /change-password");
    }
});

router.post("/change-password", async (req, res) => {
    try {
        const { username, password, newPassword, confirmNewPassword } = req.body;
        if (newPassword !== confirmNewPassword) {
            return res.status(400).send('<script>alert("New passwords do not match"); window.location="/change-password";</script>');
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('<script>alert("User not found"); window.location="/change-password";</script>');
        }
        console.log("Found user:", user);
        if (password != user.password) {
            return res.status(401).send('<script>alert("Invalid current password"); window.location="/change-password";</script>');
        }

        user.password = newPassword; 
        await user.save(); 
        console.log(newPassword)

        res.send(`<script>alert("Password changed successfully! Login with NEW Password."); window.location="/";</script>`);
    } catch (error) {
        console.error(error);
        res.status(500).send('<script>alert("Internal server error"); window.location="/change-password";</script>');
    }
});

module.exports = router;
