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
var vm;

function onNavigatedTo(args) {
    var context = args.context;
    var id = context.id;
    vm = QuoteDetailsViewModel.create(id);
    page = args.object;
    page.bindingContext = vm;
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

function getQuotesByAuthor() {
    var navigationEntry = {
        moduleName: "views/quotesByAuthor/quotesByAuthor",
        context: {
            authorName: vm.author,
            authorPicture: vm.imageUrl
        },
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);
}

function getQuotesByTag(args) {
    var tag = args.object.text;
    var navigationEntry = {
        moduleName: "views/quotesByTag/quotesByTag",
        context: {
            tag: tag
        },
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);
}

exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.onNavigatedTo = onNavigatedTo;
exports.goToShared = goToShared;
exports.getQuotesByAuthor = getQuotesByAuthor;
exports.getQuotesByTag = getQuotesByTag;
