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
        this.loadQuoteDetails();

    }

    loadQuoteDetails() {
        var url = `${config.apiUrl}/api/quotes/${this.id}`;
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
        .then(function(quoteDetails) {
            that.set("text", quoteDetails.text);
            that.set("author", quoteDetails.author);
            that.set("imageUrl", quoteDetails.imageUrl);
            that.set("tags", quoteDetails.tags);
            that.set("favoritesCount", quoteDetails.favoritesCount);
        });
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
