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


function onPageLoaded(args) {
  var page = args.object;
  //init vm
  vm = QuoteViewModel.create();
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
  var page = sender.page;
  var quote = sender.bindingContext;
  // var itemIndex = args.itemIndex;
  // var quote = vm.quotes.getItem(itemIndex);
  if (config.token) {
    vm.markFavorite(quote._id);
    quote.inFavorites = !quote.inFavorites;
    var quotesListView = view.getViewById(page, "quotesListView");
    //quotesListView.refresh();
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

function loadMoreQuotes(args) {
  vm.loadQuotes();
  var page = args.object.page;
  var quotesListView = view.getViewById(page, "quotesListView");
  quotesListView.notifyLoadOnDemandFinished();
  args.returnValue = true;
}

exports.onPageLoaded = onPageLoaded;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.quotesListItemTap = quotesListItemTap;
exports.onSwipeEnded = onSwipeEnded;
exports.goToShared = goToShared;
exports.loadMoreQuotes = loadMoreQuotes;
