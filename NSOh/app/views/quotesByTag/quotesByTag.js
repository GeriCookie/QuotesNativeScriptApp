'use strict'
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var config = require("../../shared/config");
var QuotesByTagViewModel = require("../../view-models/quotes-by-tag-view-model");
var title;
var vm;


function onPageNavigatedTo(args) {
    var page = args.object;
    var tag = page.navigationContext.tag;

    vm = QuotesByTagViewModel.create(tag);

    page.bindingContext = vm;

    title = view.getViewById(page, "title");
    title.on("tap", function(args) {
        frameModule.topmost().navigate("views/initial/initial");
    });
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

function authorPhotoTap(args) {
  var sender = args.object;
  var quote = sender.bindingContext;

    var navigationEntry = {
        moduleName: "views/quotesByAuthor/quotesByAuthor",
        context: {
          authorName: quote.author,
          authorPicture: quote.imageUrl
        },
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);
}

exports.onPageNavigatedTo = onPageNavigatedTo;
exports.quotesListItemTap = quotesListItemTap;
exports.onSwipeEnded = onSwipeEnded;
exports.quotesListItemTap = quotesListItemTap;
exports.authorPhotoTap = authorPhotoTap;
