'use strict'
let myQuotesController = function(User, Quote) {
  let get = function(req, res) {
    let page = req.query.page || 1;
    let size = req.query.size || 10;

    let myQuotes = req.user.favoriteQuotes;
    myQuotes.sort(function(u1, u2) {
      var date1 = u1.date,
        date2 = u2.date;
      return date2 - date1;
    });
    myQuotes.slice((page - 1) * size, page * size);

    return res.json({result: myQuotes});
  }

  return {
    get: get
  }
}
module.exports = myQuotesController;
