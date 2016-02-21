'use strict'
var QuoteViewModel = require("../../view-models/quote-view-model");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var topmost;
var quotesListView;
var title;

function onPageLoaded(args) {
  var page = args.object;
  //init vm
  var vm = QuoteViewModel.create();
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
  var vm = page.bindingContext;
  var itemIndex = args.itemIndex;
  var quote = vm.quotes.getItem(itemIndex);
  vm.markFavorite(quote._id)
    .catch(function(err){
      frameModule.topmost().navigate("views/login/login");
    }).then(function() {
      quotesListView.refresh();
    });

}

function onSwipeEnded(args) {
  var sender = args.object;
  var page = sender.page;
  var vm = page.bindingContext;
  var itemIndex = args.itemIndex;
  var quote = vm.quotes.getItem(itemIndex);
  var navigationEntry = {
    moduleName: "views/quote-details/quote-details",
    context: { id:quote._id },
    animated: true
  };
  frameModule.topmost().navigate(navigationEntry);

}

function goToShared() {
  var sharedQuotes = quotesData.shared();
  var navigationEntry = {
    moduleName: "views/quotes/quotes",
    context: sharedQuotes,
    animated: true
  };
  frameModule.topmost().navigate(navigationEntry);
}

exports.onPageLoaded = onPageLoaded;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.quotesListItemTap = quotesListItemTap;
exports.onSwipeEnded = onSwipeEnded;
exports.goToShared = goToShared;
