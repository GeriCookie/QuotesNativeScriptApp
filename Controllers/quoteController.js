require('../polyfills/array');
var quoteController = function(User, Quote) {
  var post = function(req, res) {
    var quote = new Quote(req.body);

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

        quotes = quotes.slice((page - 1) * size, page * size)
          .map(quote => {
            return {
              _id: quote._id,
              text: quote.text,
              author: quote.author,
              authorImageUrl: quote.authorImageUrl,
              tags: quote.tags,
              favoritesCount: quote.favoritesCount
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
          authorImageUrl: quote.authorImageUrl,
          favoritesCount: quote.favoritesCount
      };
      res.send({
        result: quoteDetails
      });
    });
};
  return {
    post: post,
    get: get,
    getById: getById
  };
};

module.exports = quoteController;
