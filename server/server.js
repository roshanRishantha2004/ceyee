const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8000
require('./config/db');

app.use(cors());
app.use(express.json({limit: '10mb'}));
//app.use(bodyParser.json({limit: '10mb'}));
//app.use('/uploads', express.static('uploads'));

const artistRouter = require('./routes/artist.route');
const songRouter = require('./routes/song.route');
const commentRouter = require('./routes/comment.route');

app.use('/api/v1/artists', artistRouter);
app.use('/api/v1/songs', songRouter);
app.use('/api/v1/comments', commentRouter)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));