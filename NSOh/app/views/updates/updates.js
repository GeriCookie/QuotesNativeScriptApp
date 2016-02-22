'use strict'
var UpdateViewModel = require("../../view-models/updates-view-model");
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
    vm = UpdateViewModel.create();
    page.bindingContext = vm;
    //init vm

    // Currently mocking with fake dat
    //console.log(vm.updates.user.username);

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
    vm.loadUpdates();
    var page = args.object.page;
    var updatesListView = view.getViewById(page, "updatesListView");
    updatesListView.notifyLoadOnDemandFinished();
    args.returnValue = true;
}

function followUser (args) {
  var sender = args.object;
  var page = sender.page;
  var update = sender.bindingContext;
  console.log(update.user.username + " followed");
}

function likeUpdate (args) {
  var sender = args.object;
  var page = sender.page;
  var update = sender.bindingContext;
  console.log(update._id + " liked");
}


exports.onPageLoaded = onPageLoaded;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.goToShared = goToShared;
exports.loadMoreUpdates = loadMoreUpdates;
exports.followUser = followUser;
exports.likeUpdate = likeUpdate;
