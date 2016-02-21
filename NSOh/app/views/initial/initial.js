var QuoteOfTheDayViewModel = require("../../view-models/initial-view-model");
var frameModule = require("ui/frame");
var quotesData = require("../../shared/quotes-data");
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
    var sharedQuotes = quotesData.shared();
    var navigationEntry = {
        moduleName: "views/quotes/quotes",
        context: sharedQuotes,
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.goToShared = goToShared;
