const express = require('express');
const songRouter = express.Router();
const songController = require('../controllers/song.controller');
const upload = require('../middlewares/upload');

songRouter.post('/', upload.fields([
    { name:'audio', maxCount: 1},
    { name: 'cover', maxCount: 1},
]), songController.createSong);

songRouter.get('/', songController.getAllSongs);

songRouter.delete('/delete/:id', songController.deleteSong);

module.exports = songRouter;