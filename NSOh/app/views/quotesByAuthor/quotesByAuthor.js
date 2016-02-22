'use strict'
var QuoteViewModel = require("../../view-models/quote-view-model");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var config = require("../../shared/config");
var topmost;
var quotesListView;
var title;
var vm;


function onPageNavigatedTo(args) {
    var page = args.object;
    console.dir(page.navigationContext);
    var author = page.navigationContext.authorName;
    var imageUrl = page.navigationContext.authorPicture;
    // Implement get all quotes by the current author (get them by author name)
    // Below I am using mocked data
    var quote = {
        quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: true,
        tags: "freedom"
    };

    var quote2 = {
        quoteText: "\"Another very clever writing.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: true,
        tags: "fight"
    };
    var quotes = [];
    quotes.push(quote);
    quotes.push(quote2);
    var observableQuotes = new ObservableArray(quotes);
    //init vm
    vm = {
      imageUrl: imageUrl,
      author: author,
      quotes: observableQuotes
    };

    page.bindingContext = vm;

    title = view.getViewById(page, "title");
    title.on("tap", function(args) {
        frameModule.topmost().navigate("views/initial/initial");
    });
}


function goToLogin() {
    frameModule.topmost().navigate("views/login/login");
}

function goToQuotesList() {
    frameModule.topmost().navigate("views/quotes/quotes");
}

function quotesListItemTap(args) {
    var sender = args.object;
    var quote = sender.bindingContext;

    if (config.token) {
        vm.markFavorite(quote._id);
        quote.inFavorites = !quote.inFavorites;
    } else {
        frameModule.topmost().navigate("views/login/login");
    }
}

function onSwipeEnded(args) {
    var sender = args.object;
    var page = sender.page;
    var vm = page.bindingContext;
    var itemIndex = args.itemIndex;
    var quote = vm.quotes.getItem(itemIndex);
    var navigationEntry = {
        moduleName: "views/quote-details/quote-details",
        context: {
            id: quote._id
        },
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);

}

function goToShared() {
    frameModule.topmost().navigate("views/updates/updates");
}

exports.onPageNavigatedTo = onPageNavigatedTo;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.quotesListItemTap = quotesListItemTap;
exports.onSwipeEnded = onSwipeEnded;
exports.goToShared = goToShared;
