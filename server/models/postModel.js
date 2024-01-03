const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    caption: {
      type: String,
      maxlength: 2200,
      default: '',
    },
    images: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
      default: '',
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    savedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    taggedUsers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
