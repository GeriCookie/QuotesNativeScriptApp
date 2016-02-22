var QuoteOfTheDayViewModel = require("../../view-models/initial-view-model");
var frameModule = require("ui/frame");
var config = require("../../shared/config");
var quote;
var page;


function pageLoaded(args) {
    page = args.object;
    quote = QuoteOfTheDayViewModel.create();
    page.bindingContext = quote;
}

function shareUnshareTap(args) {
  if (config.token) {
    quote.markFavorite();
  } else {
    frameModule.topmost().navigate("views/login/login");
  }
}

exports.pageLoaded = pageLoaded;
exports.shareUnshareTap = shareUnshareTap;