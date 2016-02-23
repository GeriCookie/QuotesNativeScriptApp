'use strict'
var UpdateViewModel = require("../../view-models/updates-view-model");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var title;
var vm;


function onPageLoaded(args) {
    var page = args.object;
    vm = UpdateViewModel.create();
    page.bindingContext = vm;

    title = view.getViewById(page, "title");
    title.on("tap", function(args) {
        frameModule.topmost().navigate("views/initial/initial");
    });
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
  var update = sender.bindingContext;
  console.log(update.user.userId);
  vm.followUser(update.user.userId);
}

function likeUpdate (args) {
  var sender = args.object;
  var update = sender.bindingContext;
  console.log(update._id + " liked");
}


exports.onPageLoaded = onPageLoaded;
exports.loadMoreUpdates = loadMoreUpdates;
exports.followUser = followUser;
exports.likeUpdate = likeUpdate;
