var UserViewModel = require("../../view-models/user-view-model");
var frameModule = require("ui/frame");
var user;
var page;

function pageLoaded(args) {
    page = args.object;
    user = new UserViewModel({
		email: "nativescriptrocks@telerik.com",
		password: "password",
		imageUrl: "fakeUrl"
	});

    page.bindingContext = user;
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

exports.pageLoaded = pageLoaded;
exports.goToRegister = goToRegister;
exports.login = login;
