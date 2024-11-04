const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const app = express();

require('./config/db');

app.use(cors());
app.use(express.json({limit: '10mb'}));
//app.use(bodyParser.json({limit: '10mb'}));
//app.use('/uploads', express.static('uploads'));

const artistRouter = require('./routes/artist.route');

app.use('/api/v1/artists', artistRouter);

app.listen(8000, () => console.log('Server is listening on port 8000!'));