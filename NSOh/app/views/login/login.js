var UserViewModel = require("../../view-models/user-view-model");
var frameModule = require("ui/frame");
var quotesData = require("../../shared/quotes-data");
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
    title.on("tap", function (args) {
        topmost.navigate("views/initial/initial");
    });
}

function goToRegister() {
	var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
}

 function login() {
 	user.login()
		.then(function (username) {
			// alert(username + " successfully logged in!");
      frameModule.topmost().navigate("views/quotes/quotes");
    });
 }

function goToLogin() {
    topmost.navigate("views/login/login");
}

function goToQuotesList() {
    topmost.navigate("views/quotes/quotes");
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

exports.pageLoaded = pageLoaded;
exports.goToRegister = goToRegister;
exports.login = login;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.goToShared = goToShared;
