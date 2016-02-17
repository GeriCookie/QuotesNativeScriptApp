var QuoteViewModel = require("../../view-models/quote-view-model");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var quotesFakeVm;
var page;
var topmost;
var quotesListView;

function pageLoaded(args) {
    page = args.object;

    quotesListView = view.getViewById(page, "quotesListView");

    var quote = {
        quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: true
    };

    var quote2 = {
        quoteText: "\"Another very clever writing.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: false
    };

    var quote3 = {
        quoteText: "\"This one is the bes one.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: true
    };

    var quote4 = {
        quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: false
    };

    var quote5 = {
        quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: true
    };

    var quote6 = {
        quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: false
    };

    var quote7 = {
        quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: true
    };

    var quote8 = {
        quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: false
    };

    var quote9 = {
        quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: true
    };

    var quote10 = {
        quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        shared: false
    };

    var list = [];
    list.push(quote);
    list.push(quote2);
    list.push(quote3);
    list.push(quote4);
    list.push(quote5);
    list.push(quote6);
    list.push(quote7);
    list.push(quote8);
    list.push(quote9);
    list.push(quote10);

    var quotesList = new ObservableArray(list);


    quotesFakeVm = new Observable({
        quotesList: quotesList
    });
    page.bindingContext = quotesFakeVm;

    topmost = frameModule.topmost();
}

function goToLogin() {
    topmost.navigate("views/login/login");
}

function goToQuotesList() {
    topmost.navigate("views/quotes/quotes");
}

function quotesListItemTap(args) {
    var itemIndex = args.index;
    quotesFakeVm.quotesList.getItem(itemIndex).shared = !(quotesFakeVm.quotesList.getItem(itemIndex).shared);
    console.log(quotesFakeVm.quotesList.getItem(itemIndex).shared);
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

exports.pageLoaded = pageLoaded;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.quotesListItemTap = quotesListItemTap;
exports.goToInitial = goToInitial;
exports.onSwipeEnded = onSwipeEnded;
