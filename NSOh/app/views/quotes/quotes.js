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

function goToMyFollowingList() {
  console.log("in my following quotes");
  if (config.token) {
    console.log("in my following if quotes");
    frameModule.topmost().navigate("views/my-following-updates/my-following-updates");
  } else {
    console.log("in my following else quotes");
    frameModule.topmost().navigate("views/login/login");
  }
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
exports.goToMyFollowingList = goToMyFollowingList;
exports.authorPhotoTap = authorPhotoTap;
