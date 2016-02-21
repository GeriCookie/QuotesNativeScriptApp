'use strict'
var config = require('../shared/config');
var Observable = require("data/observable").Observable;
var ObservableArray = require('data/observable-array').ObservableArray;

class Quote extends Observable {
    constructor(){
        super();

        this.quotes = new ObservableArray([]);
        this.currentPage = 0;
        this.loadQuotes();

    }

    loadQuotes() {
        this.currentPage+=1;
        var url = `${config.apiUrl}/api/quotes?page=${this.currentPage}`;
        let that = this;
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json().result;
        }).then(function(newQuotes) {
            newQuotes.forEach(q=>that.quotes.push(q));
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


// function Quote(info) {
//     info = info || {};
//
//     var quoteViewModel = new Observable({
//         quoteText: info.quoteText || "",
//         author: info.author || "",
//         authorImageUrl: info.authorImageUrl || "",
//         tags: info.tags || "",
//         shared: info.shared || false
//     });
//
//     quoteViewModel.createNew = function() {
//         // Implement here the login http logic
//         var promis = new Promise(
//             function(resolve, reject) {
//                 resolve("Quote created");
//         });
//         return promis;
//     };
//
//     quoteViewModel.shareQuote = function() {
//         // Implement here the register http logic
//         var promis = new Promise(
//             function(resolve, reject) {
//                 resolve("Quote shared");
//         });
//         return promis;
//     };
//
//     return quoteViewModel;
// }

module.exports = {
    create: function() {
        return new Quote();
    }
};
