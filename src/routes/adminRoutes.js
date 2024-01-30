const express = require('express');
const router = express.Router();

// Admin Dashboard Route
router.get('/', async (req, res) => {
  try {
    const username = req.query.username;
    res.render('admin-dashboard', { username: username });
  } catch (error) {
    console.error(error);
    res.render('error');
  }
});

module.exports = router;
