const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;