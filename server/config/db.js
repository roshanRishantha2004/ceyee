const mongoose = require('mongoose');
require('dotenv/config')

const MONGO_KEY = process.env.MONGO_URI
mongoose.connect(MONGO_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
      console.log('Connected to MongoDB');
  })
  .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
  });