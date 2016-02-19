var QuoteViewModel = require("../../view-models/quote-view-model");
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
    var page = args.object;
    page.bindingContext = page.navigationContext;
    topmost = frameModule.topmost();

    quoteTag = view.getViewById(page, "tagsTags");
    quoteTag.on(gestures.GestureTypes.tap, function(args) {
        var quotesWithTheSameTag = quotesData.byTag(quoteTag.text);
        var navigationEntry = {
            moduleName: "views/quotes/quotes",
            context: quotesWithTheSameTag,
            animated: true
        };
        topmost.navigate(navigationEntry);
    });

    title = view.getViewById(page, "title");
    title.on("tap", function (args) {
        topmost.navigate("views/initial/initial");
    });
}

function goToLogin() {
    topmost.navigate("views/login/login");
}

function goToQuotesList() {
    topmost.navigate("views/quotes/quotes");
}

function goToShared() {
    var sharedQuotes = quotesData.shared();
    var navigationEntry = {
        moduleName: "views/quotes/quotes",
        context: sharedQuotes,
        animated: true
    };
    topmost.navigate(navigationEntry);
}

exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.onNavigatedTo = onNavigatedTo;
exports.goToShared = goToShared;
