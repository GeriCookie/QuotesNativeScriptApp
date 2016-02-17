var express = require('express'),
  passport = require('passport');

var auth = function() {
  return passport.authenticate('bearer', {
    session: false
  });
};

var routes = function(User, Quote, Update) {
  var updateRouter = express.Router();

  var updateController = require('../Controllers/updateController')(User, Quote, Update);

  updateRouter.get('/', updateController.get)
    .get('/following', auth(), updateController.getFollowing)
    .put('/:id/comment', auth(), updateController.addComment)
    .put('/:id', auth(), updateController.likeUpdate);

    return updateRouter;
};
module.exports = routes;
