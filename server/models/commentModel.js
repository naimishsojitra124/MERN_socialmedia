const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        tag: Object,
        reply: mongoose.Types.ObjectId,
        likes: {
            type: Array,
            default: [],
        },
        user: {
            type: String,
            ref: "User",
        },
        postId: mongoose.Types.ObjectId,
        postUserId: mongoose.Types.ObjectId
    },
    {timestamps: true,}
);

module.exports = mongoose.model("Comment", CommentSchema);