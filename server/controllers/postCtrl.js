const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const postCtrl = {
  // @route  POST api/post/createPost
  createPost: async (req, res) => {
    try {
      const { caption, images, location } = req.body.newPost;
      const user = await User.findById(req.user?._id).select("-password");

      if (images.length === 0) {
        return res.status(400).json({ msg: "Please add at least one image" });
      } else if (images.length > 10) {
        return res
          .status(400)
          .json({ msg: "Please add no more than 10 images" });
      } else if (caption.length > 2200) {
        return res
          .status(400)
          .json({ msg: "Caption must be less than 2200 characters" });
      } else if (!caption.trim()) {
        return res.status(400).json({ msg: "Caption cannot be empty" });
      }

      const tagRegex = /#([^#\s]+)/g;
      const matches = caption.match(tagRegex);

      let tags = [];

      if (matches) {
        tags = matches;
      }

      const newPost = new Post({
        user: user._id,
        caption,
        images,
        tags,
        location,
      });

      await newPost.save();

      return res.status(200).json({
        msg: "Post created successfully",
        newPost,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // @route  GET api/post/getPosts
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find({
        user: [...req.user?.following, req.user?._id],
      })
        .sort("-createdAt")
        .populate("user likes", "profilePicture username name followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      return res.status(200).json({
        msg: "Posts fetched successfully",
        posts,
        result: posts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postCtrl;
