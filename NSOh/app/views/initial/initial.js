var QuoteViewModel = require("../../view-models/quote-view-model");
var frameModule = require("ui/frame");
var quotesData = require("../../shared/quotes-data");
var quote;
var page;
var topmost;


function pageLoaded(args) {
    page = args.object;

    // quote = new QuoteViewModel({
	// 	quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
	// 	author: " Martin Luther King Jr."
	// }); 


    page.bindingContext = quote;

    topmost = frameModule.topmost();
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

exports.pageLoaded = pageLoaded;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.goToShared = goToShared;
