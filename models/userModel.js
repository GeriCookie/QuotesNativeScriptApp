var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userModel = new Schema({
  username: String,
  nickname: String,
  passHash: String,
  image: String,
  token: String,
  friends: [Schema.Types.Mixed],
  favoriteQuotes: [Schema.Types.Mixed]
});

module.exports = mongoose.model('User', userModel);
