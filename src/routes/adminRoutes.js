const express = require('express');
const router = express.Router();

// Admin Dashboard Route
router.get('/', async (req, res) => {
  try {
    const username = req.query.username;
    // const data = await ProductModel.find().sort({
    //     StudentID: 1
    // }); // Sort by StudentID
    // isAdmin(req.username)? res.render('admin-dashboard', {
    //     data
    // }):res.redirect('/')

    console.log(username);
    res.render('admin-dashboard', { username: username });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
