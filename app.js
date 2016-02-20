var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  Strategy = require('passport-http-bearer');

passport.use(new Strategy(
  function(token, done) {
    User.findOne({
      token: token
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user, {
        scope: 'all'
      });
    });
  }
));
var db = mongoose.connect('mongodb://nativescript:123456@ds027719.mongolab.com:27719/quotesapi');

var User = require('./models/userModel');
var Quote = require('./models/quoteModel');
var Update = require('./models/updateModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var userRouter = require('./Routes/userRoutes')(User);
var quoteRouter = require('./Routes/quoteRoutes')(User, Quote, Update);
var updateRouter = require('./Routes/updateRoutes')(User, Quote, Update);

app.use('/api/users', userRouter);
app.use('/api/quotes', quoteRouter);
app.use('/api/updates', updateRouter);

app.get('/profile',
  passport.authenticate('bearer', {
    session: false
  }),
  function(req, res) {
    res.json(req.user);
  });

app.listen(port, function() {
  console.log('Running on PORT: ' + port);
});

module.exports = app;
