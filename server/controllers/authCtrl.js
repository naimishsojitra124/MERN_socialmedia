const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const authCtrl = {
  // @route   POST api/auth/register
  register: async (req, res) => {
    try {
      // Destructure req.body
      const { name, email, password, profilePicture } = req.body;
      let username = req.body.username.toLowerCase().replace(/ /g, '');

      // Check if password is less than 6 characters
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: 'Password must be at least 6 characters' });
      }
      //Validation
      const userExists = await User.findOne({ username });
      if (userExists)
        return res.status(400).json({ msg: 'Username already exists' });

      const emailExists = await User.findOne({ email });
      if (emailExists)
        return res.status(400).json({ msg: 'Email already exists' });

      //Generate Password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Create new user
      const newUser = new User({
        name,
        username,
        email,
        profilePicture,
        password: hashedPassword,
      });

      //Create jwt to authenticate user
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      //Set cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/api/auth/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      //Save user
      await newUser.save();

      return res.json({
        msg: 'Registered Successfully!',
        accessToken,
        user: {
          ...newUser._doc,
          password: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // @route   POST api/auth/login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //Validation
      const user = await User.findOne({ email }).populate(
        'followers following',
        '-password'
      );
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      //Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

      //Create jwt to authenticate user
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      //Set cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/api/auth/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({
        msg: 'Logged in Successfully!',
        accessToken,
        user: {
          ...user._doc,
          password: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // @route   POST api/auth/logout
  logout: async (req, res) => {
    try {
      // Clear cookie
      res.clearCookie('refreshToken', {
        path: '/api/auth/refresh_token',
      });
      return res.json({ msg: 'Logged out' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // @route   POST api/auth/refresh_token
  generateAccessToken: async (req, res) => {
    try {
      // Get refresh token
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) return res.status(400).json({ msg: 'Please login now' });

      // Verify refresh token
      jwt.verify(rf_token, JWT_REFRESH_SECRET, async (err, result) => {
        if (err) return res.status(400).json({ msg: 'Please login now' });

        // Check if user exists
        const user = await User.findById(result.id)
          .select('-password')
          .populate('followers following', '-password');
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        //Create jwt to authenticate user
        const accessToken = createAccessToken({ id: result.id });

        return res.json({
          accessToken,
          user,
        });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

// Create jwt to authenticate user
const createAccessToken = (payload) => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '7d' });
};

// Create jwt to authenticate user
const createRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

module.exports = authCtrl;
