const User = require("../models/userModel");

const userCtrl = {
  // @route   GET api/user/searchUser?username=
  searchUser: async (req, res) => {
    try {
      const users = await User.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("name username profilePicture");

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // @route   GET api/user/:userId
  getUser: async (req, res) => {
    try {
      // Get user data
      const user = await User.findById(req.params.userId).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

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

      const currentUser = await User.findById(req.user.id);

      profilePicture === ""
        ? (profilePicture = currentUser.profilePicture)
        : profilePicture;
      name === "" ? (name = currentUser.name) : name;
      username === "" ? (username = currentUser.username) : username;
      bio === "" ? (bio = currentUser.bio) : bio;
      website === "" ? (website = currentUser.website) : website;
      email === "" ? (email = currentUser.email) : email;
      gender === "" ? (gender = currentUser.gender) : gender;
      mobile === "" ? (mobile = currentUser.mobile) : mobile;
      dob === "" ? (dob = currentUser.dob) : dob;

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

      res.json({
        msg: "Profile saved successfully!",
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
};

module.exports = userCtrl;
