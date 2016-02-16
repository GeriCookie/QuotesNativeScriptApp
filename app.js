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
var db = mongoose.connect('mongodb://localhost/quotes');

var User = require('./models/userModel');
var Quote = require('./models/quoteModel');

var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var userRouter = require('./Routes/userRoutes')(User);
var quoteRouter = require('./Routes/quoteRoutes')(User, Quote);

app.use('/api/users', userRouter);
app.use('/api/quotes', quoteRouter);
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
