'use strict'
require('../polyfills/array');
var quoteController = function(User, Quote, Update) {
  var post = function(req, res) {
    var quote = new Quote(req.body);
    var user = req.user;

    Quote.findOne({
      text: quote.text
    }, function(err, dbQuote) {
      if (err) {
        throw err;
      }
      if (dbQuote) {
        return res.status(400).json({
          message: "Quote already in DB"
        });
      }
      quote.save(function(err, result) {
        if (err) {
          throw err;
        }
        var text = quote.text;
        if (text.length > 100) {
          text = `${quote.text.substring(0,100)}...`;
        }
        var newUpdate = new Update({
          text: user.username + ' added new quote.',
          date: new Date(),
          user: {
            username: user.username,
            userImageUrl: user.userImageUrl,
            userId: user._id
          },
          quote: {
            text: text,
            author: quote.author,
            imageUrl: quote.imageUrl, //must have dedault!!!!
            tags: quote.tags
          }
        });
        newUpdate.save();
        res.status(201).send(quote);
      });
    });
  };

  var get = function(req, res) {
    var page = +req.query.page;
    var size = +req.query.size;
    if (!size) {
      size = 10;
    }
    if (!page) {
      page = 1;
    }
    console.log(size);
    Quote.find()
      .exec(function(err, quotes) {
        if (err) {
          return res.status(500)
            .send(err);
        }
        if (req.query.tag) {
          var tag = req.query.tag.toLowerCase();
          quotes = quotes.filter(function(quote) {
            return !!(quote.tags.find(function(quoteTag) {
              return quoteTag.toLowerCase() === tag;
            }));
          });
        }
        //not working
        if (req.query.author) {
          var author = req.query.author.toLowerCase();
          console.log(author);
          quotes = quotes.filter(function(quote) {
            return quote.author.toLowerCase().indexOf(author) >= 0;
          });
        }
        //Elin%20Pelin
        //Elin+Pelin

        quotes = quotes.slice((page - 1) * size, page * size)
          .map(quote => {
            var text = quote.text;
            if (text.length > 100) {
              text = `${quote.text.substring(0,100)}...`;
            }
            return {
              _id: quote._id,
              text: text,
              author: quote.author,
              imageUrl: quote.imageUrl,
              tags: quote.tags,
              favoritesCount: quote.favoritesCount
            };
          });
        res.json({
          result: quotes
        });
      });
  };

  var getAuth = function(req, res) {
    var user = req.user;
    var page = +req.query.page;
    var size = +req.query.size;
    if (!size) {
      size = 10;
    }
    if (!page) {
      page = 1;
    }
    Quote.find()
      .exec(function(err, quotes) {
        if (err) {
          return res.status(500)
            .send(err);
        }
        if (req.query.tag) {
          var tag = req.query.tag.toLowerCase();
          quotes = quotes.filter(function(quote) {
            return !!(quote.tags.find(function(quoteTag) {
              return quoteTag.toLowerCase() === tag;
            }));
          });
        }
        //not working
        if (req.params.author) {
          var author = req.params.author.toLowerCase();
          quotes = quotes.filter(function(quote) {
            return quote.author.toLowerCase() === author;
          });
        }

        quotes = quotes.slice((page - 1) * size, page * size)
          .map(quote => {
            var text = quote.text;
            if (text.length > 100) {
              text = `${quote.text.substring(0,100)}...`;
            }
            return {
              _id: quote._id,
              text: text,
              author: quote.author,
              imageUrl: quote.imageUrl,
              tags: quote.tags,
              favoritesCount: quote.favoritesCount,
              inFavorites: !!(user.favoriteQuotes.find(q => q._id.toString() === quote._id.toString()))
            };
          });
        res.json({
          result: quotes
        });
      });
  };

  var getById = function(req, res) {
    Quote.findById(req.params.id)
      .exec(function(err, quote) {
        if (err) {
          return res.status(500)
            .send(err);
        }
        if (!quote) {
          return res.status(404)
            .send({
              message: "Quote not found"
            });
        }

        var quoteDetails = {
          _id: quote._id,
          text: quote.text,
          author: quote.author,
          tags: quote.tags,
          imageUrl: quote.imageUrl,
          favoritesCount: quote.favoritesCount
        };
        res.send({
          result: quoteDetails
        });
      });
  };

  var addToFavorites = function(req, res) {
    var user = req.user;
    Quote.findById(req.params.id)
      .exec(function(err, quote) {
        if (err) {
          return res.status(500)
            .send(err);
        }
        if (!quote) {
          return res.status(404)
            .send({
              message: "Quote not found"
            });
        }

        if (!quote.favoritesCount) {
          quote.favoritesCount = 0;
        }
        //bug, the counter will erase to the end of the world...

        // quote.save(function() {
        if (!user.favoriteQuotes) {
          user.favoriteQuotes = [];
        }
        var index = user.favoriteQuotes.findIndex(favQoute => favQoute._id.toString() === quote._id.toString());
        var isAdded = false;
        if (index >= 0) {
          user.favoriteQuotes.splice(index, 1);
          quote.favoritesCount--;
          quote.inFavorites = false;
        } else {
          isAdded = true;
          quote.favoritesCount++;
          quote.inFavorites = true;
          user.favoriteQuotes.push({
            text: quote.text,
            _id: quote._id,
            author: quote.author,
            imageUrl: quote.imageUrl,
            favoritesCount: quote.favoritesCount,
            dateAdded: new Date()
          });
        }

        quote.save(function(err) {
          user.save(function() {
            //if isAdded
            if (isAdded) {
              var newUpdate = new Update({
                text: user.username + ' added to favorites:',
                date: new Date(),
                user: {
                  username: user.username,
                  image: user.image,
                  userId: user._id
                },
                quote: {
                  text: quote.text,
                  _id: quote._id,
                  author: quote.author,
                  imageUrl: quote.imageUrl,
                  favoritesCount: quote.favoritesCount
                }
              });

              newUpdate.save();
            }
            res.json({
              result: quote
            });
          });
        })
      });
  };

  var random = function(req, res) {
    var randomNumber = (Math.random() * 1919) | 0;
    console.log(randomNumber);
    Quote.find().limit(1).skip(randomNumber).exec(function(err, quotes) {
      if (err) {
        return res.status(500)
          .send(err);
      }

      var quote = quotes[0];
      if (!quote) {
        return res.status(404)
          .send({
            message: "Quote not found"
          });
      }

      var quoteDetails = {
        _id: quote._id,
        text: quote.text,
        author: quote.author,
        tags: quote.tags,
        imageUrl: quote.imageUrl,
        favoritesCount: quote.favoritesCount
      };
      res.send({
        result: quoteDetails
      });
    });
  }

  return {
    post: post,
    get: get,
    getAuth: getAuth,
    getById: getById,
    addToFavorites: addToFavorites,
    random: random
  };
};

module.exports = quoteController;
