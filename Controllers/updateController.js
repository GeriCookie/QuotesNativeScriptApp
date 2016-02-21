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
        updates = updates.slice((page - 1) * size, page * size);

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
    var user = req.user;

    Update.findById(req.params.id, function(err, update) {
      if (err) {
        return res.status(500)
          .send(err);
      } else {
        if (!update.comments) {
          update.comments = [];
        }
        update.comments.push({
          comment: req.body.comment,
          username: req.user.username,
          userImageUrl: req.user.imageUrl,
          userId: req.user._id
        });
        update.save(function() {
          var result = {
            result: {
              _id: update._id,
              text: update.text,
              date: update.date,
              user: update.user,
              quote: update.quote,
              likes: update.likes ? update.likes.length : 0,
              comments: update.comments ? update.comments : null
            }
          };
          return res.json(result);
        });
      };
    });
  };

  var likeUpdate = function(req, res) {
    var user = req.user;
    Update.findById(req.params.id)
      .exec(function(err, update) {
        if (err) {
          return res.status(500)
            .send(err);
        }
        if (!update) {
          return res.status(404)
            .send({
              message: "Update not found"
            });
        }

        if (!update.likes) {
          update.likes = [];
        }

        var index = update.likes.findIndex(l => l.userId.toString() === user._id.toString());

        if (index >= 0) {
          update.likes.splice(index, 1);
        } else {
          update.likes.push({
            username: req.user.username,
            userImageUrl: req.user.imageUrl,
            userId: req.user._id
          });
        }

        update.save(function(err) {
          var result = {
            result: {
              _id: update._id,
              text: update.text,
              date: update.date,
              user: update.user,
              quote: update.quote,
              likes: update.likes ? update.likes.length : 0,
              comments: update.comments ? update.comments : null
            }
          };
          res.json(result);
        });
      })
  };

  return {
    get: get,
    getFollowing: getFollowing,
    addComment: addComment,
    likeUpdate: likeUpdate
  };
}
module.exports = updateController;
