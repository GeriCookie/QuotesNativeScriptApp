var QuoteViewModel = require("../../view-models/quote-view-model");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var quotesFakeVm;
var page;
var topmost;

function pageLoaded(args) {
    page = args.object;

    var quote = {
        quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
        author: "Martin Luther King Jr.",
        authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false"
    };

    var list = [];
    list.push(quote);
    list.push(quote);
    list.push(quote);
    list.push(quote);

    var quotesList = new ObservableArray(list);


    quotesFakeVm = new Observable({
        quotesList: quotesList
    });
    page.bindingContext = quotesFakeVm;

    topmost = frameModule.topmost();
}

function tap() {
    alert(quotesFakeVm.quotesList[0].quoteText);
}

function goToLogin() {
    topmost.navigate("views/login/login");
}

function goToQuotesList() {
    topmost.navigate("views/quotes/quotes");
}

exports.pageLoaded = pageLoaded;
exports.tap = tap;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
