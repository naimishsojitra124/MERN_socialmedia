const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

const auth = async (req, res, next) => {
  try {
    // Get token
    const token = req.header('Authorization');
    if (!token) return res.status(400).json({ msg: 'Invalid Authentication' });

    // Verify token
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    if (!decoded)
      return res.status(400).json({ msg: 'Invalid Authentication' });

    // Check if user exists
    const user = await User.findOne({ _id: decoded.id });
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
