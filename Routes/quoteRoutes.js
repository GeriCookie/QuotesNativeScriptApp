var express = require('express'),
    passport = require('passport');

var auth = function() {
  return passport.authenticate('bearer', {
    session: false
  });
};

var routes = function(User, Quote) {
  var quoteRouter = express.Router();

  var quoteController = require('../Controllers/quoteController')(User, Quote);

  quoteRouter.get('/', quoteController.get)
    .post('/', auth(), quoteController.post)
    .get('/:id', auth(), quoteController.getById);

  return quoteRouter;
};
module.exports = routes;
