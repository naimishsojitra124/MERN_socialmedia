const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, profilePicture } = req.body;
      let username = req.body.username.toLowerCase().replace(/ /g, "");

      //Validation
      const userExists = await User.findOne({ username });
      if (userExists)
        return res.status(400).json({ msg: "Username already exists" });

      const emailExists = await User.findOne({ email });
      if (emailExists)
        return res.status(400).json({ msg: "Email already exists" });

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
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      //Save user
      await newUser.save();

      return res.json({
        msg: "Registered Successfully!",
        accessToken,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //Validation
      const user = await User.findOne({ email }).populate(
        "followers following",
        "-password"
      );
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      //Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      //Create jwt to authenticate user
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      //Set cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({
        msg: "Logged in Successfully!",
        accessToken,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/api/auth/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now" });

      jwt.verify(
        rf_token,
        process.env.JWT_REFRESH_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now" });

          const user = await User.findById(result.id)
            .select("-password")
            .populate("followers following", "-password");
          if (!user)
            return res.status(400).json({ msg: "User does not exist" });

          const accessToken = createAccessToken({ id: result.id });

          return res.json({
            accessToken,
            user,
          });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "7d" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

module.exports = authCtrl;
