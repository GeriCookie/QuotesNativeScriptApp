'use strict'
var QuoteViewModel = require("../../view-models/quote-view-model");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var config = require("../../shared/config");
var topmost;
var quotesListView;
var title;
var vm;


function onPageLoaded(args) {
    var page = args.object;
    //init vm

    // Currently mocking with fake data
    var update1 = {
        text: "Hate cannot drive out hate: only love can do that.",
        userUsername: "Martin Luther King Jr.",
        userImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        _id: "1",
        quoteAuthor: "Luther",
        quoteText: "\"Hate cannot drive out hate: only love can do that.\""
    };

    var update2 = {
        text: "Another very clever writing.",
        userUsername: "Martin Luther King Jr.",
        userImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
        _id: "2",
        quoteAuthor: "Luther",
        quoteText: "\"Hate cannot drive out hate: only love can do that.\""
    };

    var updates = [];
    updates.push(update1);
    updates.push(update2);
    var updates = new ObservableArray(updates);
    vm = {
      updates: updates
    };

    page.bindingContext = vm;

    title = view.getViewById(page, "title");
    title.on("tap", function(args) {
        frameModule.topmost().navigate("views/initial/initial");
    });
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

function loadMoreUpdates(args) {
    // load more updates here
    var page = args.object.page;
    var updatesListView = view.getViewById(page, "updatesListView");
    updatesListView.notifyLoadOnDemandFinished();
    args.returnValue = true;
}

function followUser (args) {
  var sender = args.object;
  var page = sender.page;
  var update = sender.bindingContext;
  console.log(update.userUsername + " followed");
}

function likeUpdate (args) {
  var sender = args.object;
  var page = sender.page;
  var update = sender.bindingContext;
  console.log(update._id + " liked");
}

function commentUpdate (args) {
  var sender = args.object;
  var page = sender.page;
  var update = sender.bindingContext;
  console.log(update.text + " is to be commented");
}


exports.onPageLoaded = onPageLoaded;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.goToShared = goToShared;
exports.loadMoreUpdates = loadMoreUpdates;
exports.followUser = followUser;
exports.likeUpdate = likeUpdate;
exports.commentUpdate = commentUpdate;