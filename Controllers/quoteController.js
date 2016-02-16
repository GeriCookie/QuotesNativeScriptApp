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
    var page = +req.query.page | 1;
    var size = +req.query.size | 10;

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
              tags: quote.tags
            };
          });
          res.json({
            result: quotes
          });
      });
  };

var getById = function(req, res) {

};
  return {
    post: post,
    get: get,
    getById: getById
  };
};

module.exports = quoteController;
