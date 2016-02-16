var express = require('express'),
    passport = require('passport');

var auth = function() {
  return passport.authenticate('bearer', {
    session: false
  });
};

var routes = function(User, Quote, Update) {
  var quoteRouter = express.Router();

  var quoteController = require('../Controllers/quoteController')(User, Quote, Update);

  quoteRouter.get('/', quoteController.get)
    .post('/', auth(), quoteController.post)
    .get('/:id', quoteController.getById)
    .put('/:id', auth(), quoteController.addToFavorites);

  return quoteRouter;
};
module.exports = routes;
