const mongoose = require('mongoose');
const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true }
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;