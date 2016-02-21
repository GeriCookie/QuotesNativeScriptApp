var QuoteDetailsViewModel = require("../../view-models/quote-detail-view-model");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var gestures = require("ui/gestures");
var quotesData = require("../../shared/quotes-data");
var quote;
var page;
var title;
var topmost;
var quoteTag;

function onNavigatedTo(args) {
    var context = args.context;
    var id = context.id;
    var vm = QuoteDetailsViewModel.create(id);
    var page = args.object;
    page.bindingContext = vm;
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

exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.onNavigatedTo = onNavigatedTo;
exports.goToShared = goToShared;
