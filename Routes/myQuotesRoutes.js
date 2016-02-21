var express = require('express'),
    passport = require('passport');

var auth = function() {
  return passport.authenticate('bearer', {
    session: false
  });
};

var routes = function(User, Quote) {
  var myQuotesRouter = express.Router();

  var myQuotesController = require('../Controllers/myQuotesController')(User, Quote);

  myQuotesRouter.get('/',auth(), myQuotesController.get);

  return myQuotesRouter;
};
module.exports = routes;
