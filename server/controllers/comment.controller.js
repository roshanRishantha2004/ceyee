const Comment = require('../models/comment.mode');
const Song = require('../models/comment.mode');
const mongoose = require('mongoose');

exports.createComment = async (req, res) => {
    try {
        console.log(req.body)
        if (!mongoose.isValidObjectId(req.body.song))
            return res.status(400).json({ success: false, message: 'Invalid song ID' });

        const response = await Comment.create({
            comment: req.body.comment,
            song: req.body.song
        });
        if (!response) {
            return res.status(400).json({ success: false, message: 'Cannot create comment!' });
        }

        res.status(201).json({ success: true, message: 'Added new comment!' });

    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
}

exports.getAllCommentsBySong = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) 
            return res.status(400).json({ success: false, message: 'Invaild query!'});

        const filterData = await Comment.find({ song: query });

        if (filterData.length === 0) {
            return res.status(404).json({ success: false, message: 'No comments found!' });
        }

        res.status(200).json({ success: true, message: 'All comments!', data: filterData });

    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
}
