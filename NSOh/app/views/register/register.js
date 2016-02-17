var UserViewModel = require("../../view-models/user-view-model");
var frameModule = require("ui/frame");
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

function register() {
	user.register()
		.then(function (username) {
			alert(username + " successfully registered!");
		});
}

function goToLogin() {
    topmost.navigate("views/login/login");
}

function goToQuotesList() {
    topmost.navigate("views/quotes/quotes");
}

exports.pageLoaded = pageLoaded;
exports.register = register;
exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
