'use strict'
var config = require('../shared/config');
var Observable = require("data/observable").Observable;
var ObservableArray = require('data/observable-array').ObservableArray;
var fetchModule = require('fetch');

class QuoteOfTheDay extends Observable {
    constructor(){
        super();

        this.text = "";
        this.author = "";
        this.imageUrl = "";
        this.tags = [];
        this.favoritesCount = "";
        this.loadQuoteOfTheDay();

    }

    loadQuoteOfTheDay() {
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

  markFavorite() {
    // Implement here the logic for sharing unshearing this quote
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
