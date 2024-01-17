const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body;

      if (reply) {
        const cm = await Comment.findById(reply);
        if (!cm)
          return res.status(400).json({ msg: 'This comment does not exist.' });
      }

      const newComment = new Comment({
        comment: content,
        tag,
        reply,
        user: req.user._id,
        postId,
        postUserId,
      });

      await Post.findByIdAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await newComment.save();
      res.json({
        msg: 'Created a comment',
        newComment,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likeComment: async (req, res) => {
    try {
      const comment = await Comment.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (comment.length > 0)
        return res.status(400).json({ msg: 'You liked this comment.' });

      const like = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: 'This comment does not exist.' });

      res.json({ msg: 'Liked Comment' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unlikeComment: async (req, res) => {
    try {
      const like = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: 'This comment does not exist.' });

      res.json({ msg: 'Unliked Comment' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findOneAndDelete({
        _id: req.params.id,
        $or: [{ user: req.user._id }, { postUserId: req.user._id }],
      });

      await Post.findOneAndUpdate(
        { _id: comment.postId },
        {
          $pull: { comments: req.params.id },
        }
      );

      res.json({ msg: 'Comment Deleted Successfully' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = commentCtrl;
