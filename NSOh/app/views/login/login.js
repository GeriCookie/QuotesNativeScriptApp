var UserViewModel = require("../../view-models/user-view-model");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var user = UserViewModel.create();
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

exports.pageLoaded = pageLoaded;
exports.goToRegister = goToRegister;
exports.login = login;
