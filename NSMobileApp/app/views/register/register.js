var UserViewModel = require("../../view-models/user-view-model");
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

function register() {
	user.register()
		.then(function (username) {
			alert(username + " successfully registered!");
		});
}

exports.pageLoaded = pageLoaded;
exports.register = register;
