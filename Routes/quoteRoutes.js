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
    .get('/auth', auth(), quoteController.getAuth)
    .get('/random', quoteController.random)
    .get('/random/auth',auth(), quoteController.randomAuth)
    .get('/:id', quoteController.getById)
    .get('/:id/auth', auth(), quoteController.getByIdAuth)
    .put('/:id', auth(), quoteController.addToFavorites);


  return quoteRouter;
};
module.exports = routes;
