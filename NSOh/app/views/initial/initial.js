var Observable = require("data/observable").Observable;

var QuoteOfTheDayViewModel = require("../../view-models/initial-view-model");
var frameModule = require("ui/frame");
var quotesData = require("../../shared/quotes-data");
var config = require("../../shared/config");
var view = require("ui/core/view");
var quote;
var page;
var topmost;


function pageLoaded(args) {
    page = args.object;
    quote = QuoteOfTheDayViewModel.create();
    page.bindingContext = quote;
}

function goToLogin() {
    frameModule.topmost().navigate("views/login/login");
}

function goToQuotesList() {
    frameModule.topmost().navigate("views/quotes/quotes");
}

function goToShared() {
    frameModule.topmost().navigate("views/updates/updates");
}

function shareUnshareTap(args) {
  if (config.token) {
    quote.markFavorite();
  } else {
    frameModule.topmost().navigate("views/login/login");
  }
}

exports.pageLoaded = pageLoaded;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.goToShared = goToShared;
exports.shareUnshareTap = shareUnshareTap;
