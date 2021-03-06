var QuoteOfTheDayViewModel = require("../../view-models/initial-view-model");
var frameModule = require("ui/frame");
var config = require("../../shared/config");
var quote;
var page;


function pageLoaded(args) {
    page = args.object;
    quote = QuoteOfTheDayViewModel.create();
    quote.inFavorites = false;
    page.bindingContext = quote;
}

function shareUnshareTap(args) {
    if (config.token) {
        quote.markFavorite(quote._id).then(function(inFavorites) {
            quote.inFavorites = inFavorites;
        });
    } else {
        frameModule.topmost().navigate("views/login/login");
    }
}

exports.pageLoaded = pageLoaded;
exports.shareUnshareTap = shareUnshareTap;
