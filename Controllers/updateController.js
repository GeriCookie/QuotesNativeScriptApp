require('../polyfills/array');
var updateController = function(User, Quote, Update) {
  var get = function(req, res) {
    var page = req.query.page || 1,
      size = req.query.size || 10;

    Update.find({}, function(err, updates) {
      if (err) {
        return res.status(500)
          .send(err);
      } else {
        updates.sort(function(u1, u2) {
          var date1 = u1.date,
          date2 = u2.date;
          return date2 - date1;
        });
        updates = updates.slice((page -1) * size, page * size);

        updates = updates.map(function(update) {
          return {
            _id: update._id,
            text: update.text,
            date: update.date,
            user: update.user,
            quote: update.quote,
            likes: update.likes ? update.likes.length : 0,
            comments: update.comments ? update.comments : null
          };
        });

        res.json(updates);
      }
    });
  };

  var getFollowing = function(req, res) {

  };

  var addComment = function(req, res) {

  };

  var likeUpdate = function(req, res) {

  };

  return {
    get: get,
    getFollowing: getFollowing,
    addComment: addComment,
    likeUpdate: likeUpdate
  };
};

module.exports = updateController;
