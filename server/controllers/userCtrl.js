const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userCtrl = {
  // @route   GET api/user/searchUser?username=
  searchUser: async (req, res) => {
    try {
      const users = await User.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select('name username profilePicture');

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // @route   GET api/user/:userId
  getUser: async (req, res) => {
    try {
      // Get user data
      const user = await User.findById(req.params.userId)
        .select('-password')
        .populate('followers following', '-password');
      if (!user) return res.status(400).json({ msg: 'User does not exist.' });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // @route   PATCH api/user/updateUser
  updateUser: async (req, res) => {
    try {
      let {
        profilePicture,
        name,
        username,
        bio,
        website,
        email,
        gender,
        mobile,
        dob,
      } = req.body;

      //Get current user
      const currentUser = await User.findById(req.user.id);

      //Validation
      profilePicture === ''
        ? (profilePicture = currentUser.profilePicture)
        : profilePicture;
      name === '' ? (name = currentUser.name) : name;
      username === '' ? (username = currentUser.username) : username;
      bio === '' ? (bio = currentUser.bio) : bio;
      website === '' ? (website = currentUser.website) : website;
      email === '' ? (email = currentUser.email) : email;
      gender === '' ? (gender = currentUser.gender) : gender;
      mobile === '' ? (mobile = currentUser.mobile) : mobile;
      dob === '' ? (dob = currentUser.dob) : dob;

      //Update user
      await currentUser.updateOne({
        profilePicture,
        name,
        username,
        bio,
        website,
        email,
        gender,
        mobile,
        dob,
      });

      //Get updated user
      res.json({
        msg: 'Profile saved successfully!',
        user: {
          profilePicture,
          name,
          username,
          bio,
          website,
          email,
          gender,
          mobile,
          dob,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // @route   PATCH api/user/updatePassword
  updatePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;

      //Validation
      if (!oldPassword || !newPassword || !confirmPassword)
        return res.status(400).json({ msg: 'Please fill in all fields.' });

      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ msg: 'Password must be at least 6 characters.' });

      if (newPassword !== confirmPassword)
        return res.status(400).json({ msg: 'Passwords do not match.' });

      //Get user data
      const user = await User.findById(req.user?._id);
      if (!user) return res.status(400).json({ msg: 'User does not exist.' });

      //Check if old password is correct
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Old password is incorrect.' });

      //Generate new password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      //Update password
      await user.updateOne({ password: hashedPassword });

      res.json({ msg: 'Password updated successfully!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // @route   PATCH api/user/follow/:id
  follow: async (req, res) => {
    try {
      // Check if user is already in followers array
      const user = await User.find({
        _id: req?.params?.id,
        followers: req?.user?._id,
      });

      // If user is already in followers array, return error
      if (user.length > 0)
        return res.status(400).json({ msg: 'You already follow this user.' });

      // If user is not in followers array, add user to followers array
      const newUser = await User.findOneAndUpdate(
        { _id: req.params?.id },
        {
          $push: { followers: req?.user?._id },
        },
        { new: true }
      ).populate('followers following', '-password');

      // Add user to following array
      await User.findOneAndUpdate(
        { _id: req?.user?._id },
        {
          $push: { following: req?.params?.id },
        },
        { new: true }
      ).populate('followers following', '-password');

      // Return new user
      res.status(200).json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // @route   PATCH api/user/unfollow/:id
  unfollow: async (req, res) => {
    try {
      // Get user data
      const user = await User.findById({ _id: req.params?.id });

      // If user is already in followers array
      if (user?.followers?.includes(req?.user?._id)) {
        try {
          // Remove user from followers array
          const newUser = await User.findOneAndUpdate(
            { _id: req.params?.id },
            {
              $pull: { followers: req?.user?._id },
            },
            { new: true }
          ).populate('followers following', '-password');

          // Remove user from following array
          await User.findOneAndUpdate(
            { _id: req?.user?._id },
            {
              $pull: { following: req?.params?.id },
            },
            { new: true }
          ).populate('followers following', '-password');

          // Return new user
          res.status(200).json({ newUser, msg: 'Unfollowed successfully!' });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      } else {
        // If user is not in followers array, return error
        res.status(400).json({ msg: 'You do not follow this user.' });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
