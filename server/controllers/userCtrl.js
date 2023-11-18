const User = require("../models/userModel");

const userCtrl = {
    // @route   GET api/user/searchUser?username=
    searchUser: async (req, res) => {
        try {
            const users = await User.find({username: {$regex: req.query.username}}).limit(10).select("name username profilePicture");

            res.json({users});
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

            res.json({user});
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = userCtrl;