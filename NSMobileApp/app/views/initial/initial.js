var QuoteViewModel = require("../../view-models/quote-view-model");
var frameModule = require("ui/frame");
var quote;
var page;
var topmost;

function pageLoaded(args) {
    page = args.object;

    quote = new QuoteViewModel({
		quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
		author: " Martin Luther King Jr."
	});

    page.bindingContext = quote;

    topmost = frameModule.topmost();
}

function goToLogin() {
    topmost.navigate("views/login/login");
}

function goToQuotesList() {
    topmost.navigate("views/quotes/quotes");
}

exports.pageLoaded = pageLoaded;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;