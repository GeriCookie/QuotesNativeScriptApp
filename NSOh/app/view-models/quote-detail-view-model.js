'use strict'
var config = require('../shared/config');
var Observable = require("data/observable").Observable;
var ObservableArray = require('data/observable-array').ObservableArray;
var fetchModule = require('fetch');

class QuoteDetails extends Observable {
    constructor(id){
        super();
        this.id = id;
        this.text = "";
        this.author = "";
        this.imageUrl = "";
        this.tags = [];
        this.favoritesCount = "";
        this.inFavorites ="";
        this.loadQuoteDetails();

    }

    loadQuoteDetails() {
      if (config.token) {
          var url = `${config.apiUrl}/api/quotes/${this.id}/auth`;
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
          .then(function(quoteDetails) {
              that.set("text", quoteDetails.text);
              that.set("author", quoteDetails.author);
              that.set("imageUrl", quoteDetails.imageUrl);
              that.set("tags", quoteDetails.tags);
              that.set("favoritesCount", quoteDetails.favoritesCount);
              that.set("inFavorites", quoteDetails.inFavorites);
          });
      } else {
        var url = `${config.apiUrl}/api/quotes/${this.id}`;
        let that = this;
        return fetchModule.fetch(url, {
            method: "GET",
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            return json.result;
        })
        .then(function(quoteDetails) {
            that.set("text", quoteDetails.text);
            that.set("author", quoteDetails.author);
            that.set("imageUrl", quoteDetails.imageUrl);
            that.set("tags", quoteDetails.tags);
            that.set("favoritesCount", quoteDetails.favoritesCount);
        });
      }
    }

    markFavorite(id) {
    var that = this;
    console.log("I'm here");
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
        return new QuoteDetails(id);
    }
};
