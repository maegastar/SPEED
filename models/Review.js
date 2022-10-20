const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  article_id: {
    type: String,
  },
  email: {
    type: String,
  },
  review: {
    type: String,
  }
});

module.exports = Review = mongoose.model('review', ReviewSchema);