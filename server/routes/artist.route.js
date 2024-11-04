const express = require('express');
const artistRouter = express.Router();
const artistController = require('../controllers/artist.controller');
const upload = require('../middlewares/upload');

artistRouter.post('/', upload.single('file'), artistController.createArtist);

artistRouter.get('/', artistController.getAllArtists);

artistRouter.get('/:id', artistController.getArtistById);

artistRouter.put('/edit/:id', artistController.updateArtist);

artistRouter.delete('/delete/:id', artistController.deleteArtist);

module.exports = artistRouter;