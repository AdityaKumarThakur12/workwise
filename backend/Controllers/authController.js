const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.signup = async (req, res) => {
  try {
    const { name,email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name,email, password: hashed });
    await user.save();
    res.json({ message: 'User created' , users: user });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Something went wrong during signup' });
  }
}

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong during login' });
  }
}