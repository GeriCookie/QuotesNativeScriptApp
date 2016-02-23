'use strict'
var QuotesByAuthorViewModel = require("../../view-models/quotes-by-author-view-model");
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var config = require("../../shared/config");
var title;
var vm;


function onPageNavigatedTo(args) {
    var page = args.object;
    console.dir(page.navigationContext);
    var authorName = page.navigationContext.authorName;
    var imageUrl = page.navigationContext.authorPicture;

    vm = QuotesByAuthorViewModel.create(authorName);

    page.bindingContext = vm;
    //vm.imageUrl = imageUrl;

    title = view.getViewById(page, "title");
    title.on("tap", function(args) {
        frameModule.topmost().navigate("views/initial/initial");
    });
}

function quotesListItemTap(args) {
    var sender = args.object;
    var quote = sender.bindingContext;

    if (config.token) {
        console.log("In favorite" + quote._id);
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

exports.onPageNavigatedTo = onPageNavigatedTo;
exports.quotesListItemTap = quotesListItemTap;
exports.onSwipeEnded = onSwipeEnded;
