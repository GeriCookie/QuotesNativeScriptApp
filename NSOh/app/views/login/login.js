var UserViewModel = require("../../view-models/user-view-model");
var frameModule = require("ui/frame");
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
  topmost = frameModule.topmost();

  title = view.getViewById(page, "title");
  title.on("tap", function(args) {
    topmost.navigate("views/initial/initial");
  });
}

function goToRegister() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/register/register");
}

function login() {
  user.login()
    .then(function(username) {
      // alert(username + " successfully logged in!");
      frameModule.topmost().navigate("views/quotes/quotes");
    });
}

function goToMyFollowingList() {
  console.log("in my following login");
  if (config.token) {
    console.log("in my following if login");
    frameModule.topmost().navigate("views/my-following-updates/my-following-updates");
  } else {
    console.log("in my following else login");
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
exports.goToRegister = goToRegister;
exports.login = login;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.goToShared = goToShared;
exports.goToMyFollowingList = goToMyFollowingList;
