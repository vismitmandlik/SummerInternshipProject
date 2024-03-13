// const express = require('express');
// const router = express.Router();
// const { UserModel } = require('../models/user.model');

// router.get('/change-password', async (req, res) => {
//   try {
//     res.render('change-password');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error at /change-password');
//   }
// });

// router.post('/change-password', async (req, res) => {
//   try {
//     const { username, password, newPassword } = req.body;
//     console.log()
//     // if (newPassword !== confirmNewPassword) {
//     //   return res.status(400).json({ error: 'New passwords do not match' });
//     // }
//     const user = await UserModel.findOne({ username : username }, { password: 1 });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     console.log('Found user:', user);
//     if (password != user.password) {
//       return res.status(401).json({ error: 'Invalid current password' });
//     }
//     user.password = newPassword;
//     await user.save();
//     console.log(newPassword);
//     res.json({
//       success: true,
//       message: 'Password changed successfully! Login with NEW Password.'
//     });
//   } catch (error) {
//     console.error(error);
//     if (error.name === 'ValidationError') {
//       return res
//         .status(400)
//         .json({ error: `Validation error: ${error.message}` });
//     }
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
