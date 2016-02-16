var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var updateModel = new Schema({
  text: String,
  date: Date,
  user: Schema.Types.Mixed,
  comments: [Schema.Types.Mixed],
  likes: [Schema.Types.Mixed],
  quote: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Update', updateModel);
