'use strict'
var config = require('../shared/config');
var Observable = require("data/observable").Observable;
var ObservableArray = require('data/observable-array').ObservableArray;
var fetchModule = require('fetch');

class QuoteOfTheDay extends Observable {
  constructor() {
    super();

    this.text = "";
    this.author = "";
    this.imageUrl = "";
    this.tags = [];
    this.favoritesCount = "";
    this.inFavorites = "";
    this.loadQuoteOfTheDay();

  }

  loadQuoteOfTheDay() {
    if (config.token) {

      var url = `${config.apiUrl}/api/quotes/random/auth`;
      let that = this;
      return fetchModule.fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${config.token}`
          }
        })
        .then(handleErrors)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          return json.result;
        })
        .then(function(quoteOfTheDay) {
          that.set("_id", quoteOfTheDay._id);
          that.set("text", quoteOfTheDay.text);
          that.set("author", quoteOfTheDay.author);
          that.set("imageUrl", quoteOfTheDay.imageUrl);
          that.set("tags", quoteOfTheDay.tags);
          that.set("favoritesCount", quoteOfTheDay.favoritesCount);
          that.set("inFavorites", quoteOfTheDay.inFavorites);
        });
    } else {
      console.log("in else");
      var url = `${config.apiUrl}/api/quotes/random`;
      let that = this;
      return fetchModule.fetch(url, {
          method: "GET"
        })
        .then(handleErrors)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          return json.result;
        })
        .then(function(quoteOfTheDay) {
          that.set("_id", quoteOfTheDay._id);
          that.set("text", quoteOfTheDay.text);
          that.set("author", quoteOfTheDay.author);
          that.set("imageUrl", quoteOfTheDay.imageUrl);
          that.set("tags", quoteOfTheDay.tags);
          that.set("favoritesCount", quoteOfTheDay.favoritesCount);
        });
    }
  }

  markFavorite(id) {
    var that = this;
    return fetch(`${config.apiUrl}/api/quotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${config.token}`
        }
      }).then(handleErrors)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.dir(json.result);
        return json.result;
      }).then(function(inFavorites) {
        that.set("inFavorites", inFavorites);
      });;
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
  create: function(id) {
    return new QuoteOfTheDay();
  }
};
