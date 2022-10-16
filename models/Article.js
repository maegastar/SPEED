//need to figure out model

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  published_date: {
    type: Date,
  },
  publisher: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: Number,
    default: 0
  },
});

module.exports = Article = mongoose.model('article', ArticleSchema);