const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const dbConnect = () => {
  if (!DB_URL) {
    console.error('DB_URL is not defined in environment variables');
    return;
  }
  
  mongoose.connect(DB_URL)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
}

module.exports = dbConnect;