const mongoose = require('mongoose');

UrlSchema = mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  clicks: {
    type: Number,
    default: 0
  },
  urlCode: String,
  date: {
    type: String,
    default: Date.now
  }
});

module.exports = mongoose.model('Url', UrlSchema);
