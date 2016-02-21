'use strict'
var config = require('../shared/config');
var Observable = require("data/observable").Observable;
var ObservableArray = require('data/observable-array').ObservableArray;
var fetchModule = require('fetch');
var config = require('../shared/config');

class Quote extends Observable {
  constructor() {
    super();

    this.quotes = new ObservableArray([]);
    this.currentPage = 0;
    this.loadQuotes();

  }

  loadQuotes() {
    if (config.token) {
      this.currentPage += 1;
      var url = `${config.apiUrl}/api/quotes/auth?page=${this.currentPage}`;
      let that = this;
      console.log(url);
      return fetchModule.fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${config.token}`
          }
        })
        .then(handleErrors)
        .then(function(response) {
          console.dir(response);
          return response.json();
        })
        .then(function(json) {
          console.log(json);
          return json.result;
        })
        .then(function(newQuotes) {
          console.log(newQuotes);
          newQuotes.forEach(q => that.quotes.push(q));
        });
    } else {
      this.currentPage += 1;
      var url = `${config.apiUrl}/api/quotes?page=${this.currentPage}`;
      let that = this;
      console.log(url);
      return fetchModule.fetch(url, {
          method: "GET"
        })
        .then(handleErrors)
        .then(function(response) {
          console.dir(response);
          return response.json();
        })
        .then(function(json) {
          console.log(json);
          return json.result;
        })
        .then(function(newQuotes) {
          console.log(newQuotes);
          newQuotes.forEach(q => that.quotes.push(q));
        });
    }
  }

  markFavorite(id) {
    if (!config.token) {
      return Promise.reject("Not authenticated");
    }
    var that = this;
    return fetch(`${config.apiUrl}/api/quotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${config.token}`
        }
      })
      .then(handleErrors)
      .then(function(json) {
        console.log(json);
        return json.result;
      })
      .then(function(quote) {
        var index = that.quotes.findIndex(q => q._id.toString() === quote._id.toString());
        that.quotes[index].inFavorites = !that.quotes[index].inFavorites;
      });
  }


}
}

function handleErrors(response) {
  if (!response.ok) {
    console.log(JSON.stringify(response));
    throw Error(response.statusText);
  }
  return response;
}


module.exports = {
  create: function() {
    return new Quote();
  }
};
