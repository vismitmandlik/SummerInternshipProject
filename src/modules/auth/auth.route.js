const express = require('express');
const { UserModel, UserRole } = require('../users');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username }).lean();

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== password) res.redirect('/');

    if (user.role == UserRole.FACULTY) {
      res.render('admin-dashboard', { user: user });
    } else if (user.role === UserRole.STUDENT) {
      res.render('student-dashboard', {
        student: {
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          enrollmentNumber: user.enrollmentNumber,
          role: user.role,
        },
      });
    } else {
      console.error(`Invalid role ${user.role}`);
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.redirect('/');
  }
});

// Admin Dashboard Route
router.get('/admin-dashboard', async (req, res) => {
  try {
    const username = req.query.username;
    res.render('admin-dashboard', { username: username });
  } catch (error) {
    console.error(error);
    res.render('error');
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

//Student-dashboard
router.get('/student-dashboard', async (req, res) => {
  try {
    const studentID = req.query.StudentID;

    const student = await ProductModel.findOne({
      StudentID: studentID,
    }).lean();
    res.render('student-dashboard', { student: student });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error at /student-dashboard');
  }
});

module.exports = router;
