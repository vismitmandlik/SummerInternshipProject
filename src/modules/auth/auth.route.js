const express = require('express');
const { UserModel, UserRole } = require('../users');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await UserModel.findOne({ username: username }).lean();

    if (!userDoc) {
      throw new Error('User not found');
    }

    if (userDoc.password !== password) res.redirect('/');

    const user = {
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
      fullName: userDoc.fullName,
      username: userDoc.username,
      enrollmentNumber: userDoc.enrollmentNumber,
      role: userDoc.role,
    };

    if (userDoc.role == UserRole.FACULTY) {
      res.render('admin-dashboard', { user });
    } else if (userDoc.role === UserRole.STUDENT) {
      res.render('student-dashboard', { user });
    } else {
      console.error(`Invalid role ${userDoc.role}`);
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.redirect('/');
  }
});



// Register Faculty Route
router.get('/register-faculty', async (req, res) => {
  try {
    res.render('register-faculty');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error at .get/register-faculty');
  }
});

// Register Faculty Route (accessible by admin) TODO TODO
router.post('/register-faculty', async (req, res) => {
  try {
    const { username, role, password } = req.body;
    // TODO: Check if the current user has admin privileges to access this route
    if (true) {
      const faculty = new UserModel({ username, role: 'faculty', password });
      await faculty.save();

      res.redirect('/admin-dashboard');
    } else {
      res.status(403).send('Access denied');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Change Password
router.get('/change-password', async (req, res) => {
  try {
    res.render('change-password');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error at /change-password');
  }
});

router.post('/change-password', async (req, res) => {
  try {
    const { username, password, newPassword } = req.body;
    console.log();
    // if (newPassword !== confirmNewPassword) {
    //   return res.status(400).json({ error: 'New passwords do not match' });
    // }
    const user = await UserModel.findOne(
      { username: username },
      { password: 1 }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('Found user:', user);
    if (password != user.password) {
      return res.status(401).json({ error: 'Invalid current password' });
    }
    user.password = newPassword;
    await user.save();
    console.log(newPassword);
    res.json({
      success: true,
      message: 'Password changed successfully! Login with NEW Password.',
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ error: `Validation error: ${error.message}` });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
