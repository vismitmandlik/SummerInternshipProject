const express = require('express');

const router = express.Router();

router.get('/change-password', async (req, res) => {
  try {
    res.render('change-password');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error at /change-password');
  }
});

module.exports = router;
