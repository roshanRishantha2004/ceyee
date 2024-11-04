const Artist = require('../models/artist.model');
const mongoose = require('mongoose');
const upload = require('../middlewares/upload');
const cloudinary = require('../config/cloudinaryConfig');

exports.createArtist = async (req, res) => {
    try {
        
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'images'
        });

        const response = await Artist.create({ 
            name: req.body.name,
            description: req.body.description,
            imgUrl: result.secure_url
         });

        if (!response) {
            return res.status(400).json({ success: false, message: 'Cannot create artist!' });
        }

        res.status(201).json({ success: true, message: 'Added new artist!' });

    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
}

exports.getAllArtists = async (req, res) => {
    try {
        const response = await Artist.find();

        if (response.length === 0) {
            return res.status(404).json({ success: false, message: 'No artists found!' });
        }

        res.status(200).json({ success: true, message: 'All Artists!', data: response });

    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
}

exports.getArtistById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ success: false, message:'Invalid object id' });

        const response = await Artist.findById(id);

        if (response.length === 0) {
            return res.status(404).json({ success: false, message: 'No artists found!' });
        }

        res.status(200).json({ success: true, message: 'Artist found!', data: response });

    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
}

exports.updateArtist = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ success: false, message:'Invalid object id' });
        
        const response = await Artist.findByIdAndUpdate(id, req.body, { new: true });

        if (response.length === 0) {
            return res.status(404).json({ success: false, message: 'No artists found!' });
        }

        res.status(200).json({ success: true, message: 'Artist updated!', data: { response } });

    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
}

exports.deleteArtist = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ success: false, message:'Invalid object id' });
        
        const response = await Artist.findByIdAndDelete(id);

        if (response.length === 0) {
            return res.status(404).json({ success: false, message: 'No artists found!' });
        }

        res.status(200).json({ success: true, message: 'Artist deleted!', data: response });

    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
}
