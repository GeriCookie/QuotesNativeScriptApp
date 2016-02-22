var UserViewModel = require("../../view-models/user-view-model");
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var quotesData = require("../../shared/quotes-data");
var view = require("ui/core/view");
var user = UserViewModel.create();
var config = require('../../shared/config');
var page;
var topmost;
var title;

function pageLoaded(args) {
    page = args.object;

    page.bindingContext = user;

    user.set("username", "");
    user.set("password", "");
    //user.set("imageUrl", "")

    username = page.getViewById("username");
    password = page.getViewById("password");
    //imageUrl = page.getViewById("imageUrl");
    registerButton = page.getViewById("register-button");


    topmost = frameModule.topmost();

    title = view.getViewById(page, "title");
    title.on("tap", function (args) {
        topmost.navigate("views/initial/initial");
    });
}

function completeRegistration() {
    user.register()
        .then(function() {
            console.log("IN Complete registration");
            dialogsModule
                .alert("Your account was successfully created.")
                .then(function() {
                    topmost.navigate("views/login/login");
                }).catch(function() {
                    dialogsModule.alert({
                        message: "Unfortunately we were unable to create your account.",
                        okButtonText: "OK"
                    });
                });
        })
}

function register() {
    console.log("IN REGISTER");
    completeRegistration();
}

function goToMyFollowingList() {
  console.log("in my following register");
  if (config.token) {
    console.log("in my following if register");
    frameModule.topmost().navigate("views/my-following-updates/my-following-updates");
  } else {
    console.log("in my following else register");
    frameModule.topmost().navigate("views/login/login");
  }
}

function goToLogin() {
    topmost.navigate("views/login/login");
}

function goToQuotesList() {
    topmost.navigate("views/quotes/quotes");
}

function goToShared() {
    frameModule.topmost().navigate("views/updates/updates");
}

exports.pageLoaded = pageLoaded;
exports.register = register;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.goToShared = goToShared;
exports.goToMyFollowingList = goToMyFollowingList;
