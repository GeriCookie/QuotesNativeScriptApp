var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var quoteModel = new Schema({
  text: String,
  author: String,
  authorImageUrl: String,
  tags: [String],
  favoritesCount: Number
});

module.exports = mongoose.model('Quote', quoteModel);
