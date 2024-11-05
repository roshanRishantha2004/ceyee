const mongoose = require('mongoose');
const Song = require('../models/song.model');
const Artist = require('../models/artist.model');
const cloudinary = require('../config/cloudinaryConfig');
const Comment = require('../models/comment.mode');

exports.createSong = async (req, res) => {
    try {
        // Validate artist ID
        console.log(req.files)
        if (!mongoose.isValidObjectId(req.body.artist))
            return res.status(400).json({ success: false, message: 'Invalid artist ID' });

        const artist = await Artist.findById(req.body.artist);
        if (!artist) {
            return res.status(404).json({ success: false, message: 'Artist not found' });
        }

        const videoResult = await cloudinary.uploader.upload(req.files.audio[0].path, {
            folder: 'videos',
            resource_type: 'raw',  
        });

        const coverResult = await cloudinary.uploader.upload(req.files.cover[0].path, {
            folder: 'images',
            resource_type: 'image', 
        });

        const newSong = new Song({
            name: req.body.name,
            description: req.body.description,
            artist: req.body.artist,
            img: coverResult.secure_url,  
            path: videoResult.secure_url, 
        });

        await newSong.save();

        res.status(201).json({
            success: true,
            message: 'Song created successfully!',
            song: newSong,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
};

exports.getAllSongs = async (req, res) => {
    try {
        const response = await Song.find()
                         .populate('artist');

        if (response === null)
            return res.status(404).json({ success: false, message: 'Cannot find songs!' });

        return res.status(200).json({ success: true, message: 'All songs!', data: {
            response
        }})
    }  catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` })
    }
}

exports.deleteSong = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ success: false, message:'Invalid object id' });

        console.log(req.params.id)

        const comments = await Comment.find({ song: req.params.id});
        console.log(comments._id)
        
        
        await Comment.deleteMany(comments._id)
        const response = await Song.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Song deleted!', data: null });

    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
}

