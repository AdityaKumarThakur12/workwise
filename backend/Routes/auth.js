const express = require('express');
const { signup, login } = require('../Controllers/authController');
const router = express.Router();
const User = require('../Models/user');
const auth = require('../Middlewares/auth')

router.post('/signup', signup );

router.post('/login', login );
router.get('/me', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json({ user });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
