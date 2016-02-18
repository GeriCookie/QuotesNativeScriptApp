var QuoteViewModel = require("../../view-models/quote-view-model");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var quotesData = require("../../shared/quotes-data");
var quotesFakeVm;
var page;
var topmost;
var quotesListView;

function onNavigatedTo(args) {
    page = args.object;
    quotesListView = view.getViewById(page, "quotesListView");
    
    var list;
    if (page.navigationContext) {
        list = page.navigationContext;
    } else {
        list = quotesData.all;
    }

    var quotesList = new ObservableArray(list);
    quotesFakeVm = new Observable({
        quotesList: quotesList
    });
    page.bindingContext = quotesFakeVm;

    topmost = frameModule.topmost();
}

function pageLoaded(args) {
    
}

function goToLogin() {
    topmost.navigate("views/login/login");
}

function goToQuotesList() {
    topmost.navigate("views/quotes/quotes");
}

function quotesListItemTap(args) {
    var itemIndex = args.itemIndex;
    quotesFakeVm.quotesList.getItem(itemIndex).shared = !(quotesFakeVm.quotesList.getItem(itemIndex).shared);
    quotesListView.refresh();
}

function goToInitial() {
    topmost.navigate("views/initial/initial");
}

function onSwipeEnded(args) {
    var itemIndex = args.itemIndex;
    var selectedItem = quotesFakeVm.quotesList.getItem(itemIndex);
    var navigationEntry = {
        moduleName: "views/quote-details/quote-details",
        context: selectedItem,
        animated: true
    };
    topmost.navigate(navigationEntry);
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

exports.onNavigatedTo = onNavigatedTo;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.quotesListItemTap = quotesListItemTap;
exports.goToInitial = goToInitial;
exports.onSwipeEnded = onSwipeEnded;
exports.goToShared = goToShared;
