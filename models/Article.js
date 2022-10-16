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
    type: String,
    default: 'Pending_Review', // Other Possible Values: 'Approved_By_Moderator', 'Approved_By_Analyst'
  },
});

module.exports = Article = mongoose.model('article', ArticleSchema);