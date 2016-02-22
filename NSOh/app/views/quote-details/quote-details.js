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

function goToMyFollowingList() {
  console.log("in my following details");
  if (config.token) {
    console.log("in my following if details");
    frameModule.topmost().navigate("views/my-following-updates/my-following-updates");
  } else {
    console.log("in my following else details");
    frameModule.topmost().navigate("views/login/login");
  }
}

function getQuotesByAuthor() {
    // Implement get all quotes by the current author (author name available in vm.author)
    var allQuotesByAuthor;

    var navigationEntry = {
        moduleName: "views/quotes/quotes",
        context: allQuotesByAuthor,
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);
}

function getQuotesByTag(args) {
    var tag = args.object.text;
    // Implement get all quotes by the given tag
    var allQuotesByTag;

    var navigationEntry = {
        moduleName: "views/quotes/quotes",
        context: allQuotesByTag,
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
exports.goToMyFollowingList = goToMyFollowingList;
