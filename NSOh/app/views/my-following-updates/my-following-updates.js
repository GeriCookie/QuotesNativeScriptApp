'use strict'
var MyFollowingUpdateViewModel = require("../../view-models/my-following-updates-view-model");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var title;
var vm;


function onPageLoaded(args) {
    var page = args.object;
    vm = MyFollowingUpdateViewModel.create();
    page.bindingContext = vm;

    title = view.getViewById(page, "title");
    title.on("tap", function(args) {
        frameModule.topmost().navigate("views/initial/initial");
    });
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
  var update = sender.bindingContext;
  console.log(update.userUsername + " followed");
}

function likeUpdate (args) {
  var sender = args.object;
  var update = sender.bindingContext;
  console.log(update._id + " liked");
}

function commentUpdate (args) {
  var sender = args.object;
  var update = sender.bindingContext;
  console.log(update.text + " is to be commented");
}


exports.onPageLoaded = onPageLoaded;
exports.loadMoreUpdates = loadMoreUpdates;
exports.followUser = followUser;
exports.likeUpdate = likeUpdate;
exports.commentUpdate = commentUpdate;