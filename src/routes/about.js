const express = require('express');
const router = express.Router();

router.get("/about", async (req, res) => {
    try {
        res.render("about");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error at /about");
    }
});

module.exports = router;