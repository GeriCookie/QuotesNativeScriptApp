var UserViewModel = require("../../view-models/user-view-model");
var frameModule = require("ui/frame");
var quotesData = require("../../shared/quotes-data");
var user;
var page;
var topmost;

function pageLoaded(args) {
    page = args.object;
    user = new UserViewModel({
		email: "nativescriptrocks@telerik.com",
		password: "password",
		imageUrl: "fakeUrl"
	});

    page.bindingContext = user;
    topmost = frameModule.topmost();
}

function goToRegister() {
	var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
}

 function login() {
 	user.login()
		.then(function (username) {
			alert(username + " successfully logged in!");
		});
 }

function goToLogin() {
    topmost.navigate("views/login/login");
}

function goToQuotesList() {
    topmost.navigate("views/quotes/quotes");
}

function goToInitial() {
	topmost.navigate("views/initial/initial");
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
exports.goToInitial = goToInitial;
exports.goToShared = goToShared;
